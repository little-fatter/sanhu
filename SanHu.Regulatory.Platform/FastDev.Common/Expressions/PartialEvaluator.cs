using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace FastDev.Common.Expressions
{
	public class PartialEvaluator : ExpressionVisitor
	{
		private class Nominator : ExpressionVisitor
		{
			private Func<Expression, bool> m_fnCanBeEvaluated;

			private HashSet<Expression> m_candidates;

			private bool m_cannotBeEvaluated;

			internal Nominator(Func<Expression, bool> fnCanBeEvaluated)
			{
				m_fnCanBeEvaluated = fnCanBeEvaluated;
			}

			internal HashSet<Expression> Nominate(Expression expression)
			{
				m_candidates = new HashSet<Expression>();
				Visit(expression);
				return m_candidates;
			}

			protected override Expression Visit(Expression expression)
			{
				if (expression != null)
				{
					bool cannotBeEvaluated = m_cannotBeEvaluated;
					m_cannotBeEvaluated = false;
					base.Visit(expression);
					if (!m_cannotBeEvaluated)
					{
						if (m_fnCanBeEvaluated(expression))
						{
							m_candidates.Add(expression);
						}
						else
						{
							m_cannotBeEvaluated = true;
						}
					}
					m_cannotBeEvaluated |= cannotBeEvaluated;
				}
				return expression;
			}
		}

		private Func<Expression, bool> m_fnCanBeEvaluated;

		private HashSet<Expression> m_candidates;

		public PartialEvaluator()
			: this(CanBeEvaluatedLocally)
		{
		}

		public PartialEvaluator(Func<Expression, bool> fnCanBeEvaluated)
		{
			m_fnCanBeEvaluated = fnCanBeEvaluated;
		}

		public Expression Eval(Expression exp)
		{
			m_candidates = new Nominator(m_fnCanBeEvaluated).Nominate(exp);
			return Visit(exp);
		}

		protected override Expression Visit(Expression exp)
		{
			if (exp == null)
			{
				return null;
			}
			if (m_candidates.Contains(exp))
			{
				return Evaluate(exp);
			}
			return base.Visit(exp);
		}

		private Expression Evaluate(Expression e)
		{
			if (e.NodeType == ExpressionType.Constant)
			{
				return e;
			}
			LambdaExpression lambdaExpression = Expression.Lambda(e);
			Delegate @delegate = lambdaExpression.Compile();
			return Expression.Constant(@delegate.DynamicInvoke(null), e.Type);
		}

		private static bool CanBeEvaluatedLocally(Expression exp)
		{
			return exp.NodeType != ExpressionType.Parameter;
		}
	}
}
