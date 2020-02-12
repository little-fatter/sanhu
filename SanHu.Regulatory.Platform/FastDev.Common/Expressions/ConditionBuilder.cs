using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace FastDev.Common.Expressions
{
	public class ConditionBuilder : ExpressionVisitor
	{
		private List<object> m_arguments;

		private Stack<string> m_conditionParts;

		public string Condition
		{
			get;
			private set;
		}

		public object[] Arguments
		{
			get;
			private set;
		}

		public void Build(Expression expression)
		{
			PartialEvaluator partialEvaluator = new PartialEvaluator();
			Expression exp = partialEvaluator.Eval(expression);
			m_arguments = new List<object>();
			m_conditionParts = new Stack<string>();
			Visit(exp);
			Arguments = m_arguments.ToArray();
			Condition = ((m_conditionParts.Count > 0) ? m_conditionParts.Pop() : null);
		}

		protected override Expression VisitBinary(BinaryExpression b)
		{
			if (b == null)
			{
				return b;
			}
			string arg;
			switch (b.NodeType)
			{
			case ExpressionType.Equal:
				arg = "=";
				break;
			case ExpressionType.NotEqual:
				arg = "<>";
				break;
			case ExpressionType.GreaterThan:
				arg = ">";
				break;
			case ExpressionType.GreaterThanOrEqual:
				arg = ">=";
				break;
			case ExpressionType.LessThan:
				arg = "<";
				break;
			case ExpressionType.LessThanOrEqual:
				arg = "<=";
				break;
			case ExpressionType.AndAlso:
				arg = "AND";
				break;
			case ExpressionType.OrElse:
				arg = "OR";
				break;
			case ExpressionType.Add:
				arg = "+";
				break;
			case ExpressionType.Subtract:
				arg = "-";
				break;
			case ExpressionType.Multiply:
				arg = "*";
				break;
			case ExpressionType.Divide:
				arg = "/";
				break;
			default:
				throw new NotSupportedException(b.NodeType + " is not supported.");
			}
			Visit(b.Left);
			Visit(b.Right);
			string arg2 = m_conditionParts.Pop();
			string arg3 = m_conditionParts.Pop();
			string item = string.Format("({0} {1} {2})", arg3, arg, arg2);
			m_conditionParts.Push(item);
			return b;
		}

		protected override Expression VisitConstant(ConstantExpression c)
		{
			if (c == null)
			{
				return c;
			}
			m_arguments.Add(c.Value);
			m_conditionParts.Push(string.Format("{{{0}}}", m_arguments.Count - 1));
			return c;
		}

		protected override Expression VisitMemberAccess(MemberExpression m)
		{
			if (m == null)
			{
				return m;
			}
			PropertyInfo propertyInfo = m.Member as PropertyInfo;
			if (propertyInfo == null)
			{
				return m;
			}
			m_conditionParts.Push(string.Format("[{0}]", propertyInfo.Name));
			return m;
		}

		protected override Expression VisitMethodCall(MethodCallExpression m)
		{
			if (m == null)
			{
				return m;
			}
			string format;
			switch (m.Method.Name)
			{
			case "StartsWith":
				format = "({0} LIKE {1}+'%')";
				break;
			case "Contains":
				format = "({0} LIKE '%'+{1}+'%')";
				break;
			case "EndsWith":
				format = "({0} LIKE '%'+{1})";
				break;
			default:
				throw new NotSupportedException(m.NodeType + " is not supported!");
			}
			Visit(m.Object);
			Visit(m.Arguments[0]);
			string arg = m_conditionParts.Pop();
			string arg2 = m_conditionParts.Pop();
			m_conditionParts.Push(string.Format(format, arg2, arg));
			return m;
		}
	}
}
