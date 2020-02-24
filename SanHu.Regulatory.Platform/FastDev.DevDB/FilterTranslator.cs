using FastDev.Common;
using FastDev.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;

namespace FastDev.DevDB
{
    public class FilterTranslator
    {
        protected char leftToken;

        protected char paramPrefixToken;

        protected char rightToken;

        protected char groupLeftToken;

        protected char groupRightToken;

        protected char likeToken;
        public FilterGroup Group
        {
            get;
            set;
        }

        public string CommandText
        {
            get;
            private set;
        }

        public IList<object> Parms
        {
            get;
            private set;
        }

        public FilterTranslator() : this(null)
        {
        }

        public FilterTranslator(FilterGroup group)
        {

            string providerName = ConfigurationManager.AppSettings["ProviderName"].ToLower();
            if (providerName.Contains("sqlite"))
            {

                leftToken = '[';
                rightToken = ']';
            }
            else if (providerName.Contains("mysql"))
            {
                leftToken = '`';
                rightToken = '`';
            }
            else
            {
                leftToken = '[';
                rightToken = ']';
            }
            paramPrefixToken = '@';
            groupLeftToken = '(';
            groupRightToken = ')';
            likeToken = '%';

            Group = group;
            Parms = new List<object>();
        }

        public void Translate()
        {
            CommandText = TranslateGroup(Group);
        }

        public string TranslateGroup(FilterGroup group)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (group == null)
            {
                return " 1=1 ";
            }
            bool flag = false;
            stringBuilder.Append(groupLeftToken);
            if (group.rules != null)
            {
                if (group.rules.Any(r => r.op == "between"))
                {
                    List<FilterRule> list = group.rules.Where(r => r.op == "between").ToList();
                    List<FilterRule> rules = group.rules.Where(r => r.op != "between").ToList();
                    List<FilterGroup> list2 = new List<FilterGroup>();
                    foreach (FilterRule item2 in list)
                    {
                        item2.type = item2.type.Replace("between_", "");
                        string[] array = item2.value.ToStr().Split(';');
                        string value = array[0];
                        string value2 = array[1];
                        FilterRule filterRule = item2.Copy();
                        FilterRule filterRule2 = item2.Copy();
                        filterRule.value = value;
                        filterRule2.value = value2;
                        filterRule2.op = "lessorequal";
                        filterRule.op = "greaterorequal";
                        FilterGroup filterGroup = new FilterGroup();
                        filterGroup.op = "and";
                        filterGroup.rules = new List<FilterRule>();
                        FilterGroup filterGroup2 = filterGroup;
                        if (!string.IsNullOrEmpty(value))
                        {
                            filterGroup2.rules.Add(filterRule);
                        }
                        if (!string.IsNullOrEmpty(value2))
                        {
                            filterGroup2.rules.Add(filterRule2);
                        }
                        if (filterGroup2.rules.Any())
                        {
                            list2.Add(filterGroup2);
                        }
                    }
                    FilterGroup filterGroup3 = new FilterGroup();
                    filterGroup3.op = "and";
                    filterGroup3.rules = rules;
                    filterGroup3.groups = list2;
                    FilterGroup item = filterGroup3;
                    if (group.groups == null)
                    {
                        group.groups = new List<FilterGroup>();
                    }
                    group.groups.Add(item);
                }
                else
                {
                    foreach (FilterRule rule in group.rules)
                    {
                        if (flag)
                        {
                            stringBuilder.Append(GetOperatorQueryText(group.op));
                        }
                        stringBuilder.Append(TranslateRule(rule));
                        flag = true;
                    }
                }
            }
            if (group.groups != null)
            {
                foreach (FilterGroup group2 in group.groups)
                {
                    if (flag)
                    {
                        stringBuilder.Append(GetOperatorQueryText(group.op));
                    }
                    stringBuilder.Append(TranslateGroup(group2));
                    flag = true;
                }
            }
            stringBuilder.Append(groupRightToken);
            if (!flag)
            {
                return " 1=1 ";
            }
            return stringBuilder.ToString();
        }

        public string TranslateRule(FilterRule rule)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (rule == null)
            {
                return " 1=1 ";
            }
            if (rule.op == "equal" && (rule.value == null || string.IsNullOrEmpty(rule.value.ToStr()) || rule.value.ToStr().StartsWith("text:")))
            {
                return " 1=1 ";
            }
            if (rule.type == "sql")
            {
                string text = rule.field.ToStr();
                if (text.Contains("{0}"))
                {
                    return string.Format(text, paramPrefixToken + AddRuleParms(rule.value, rule.type));
                }
                return text;
            }
            if (rule.value.ToStr() == "{CurrentUserID}")
            {
                rule.value = SysContext.WanJiangUserID;
            }
            else if (new Regex("^{\\w+}$", RegexOptions.IgnoreCase).IsMatch(rule.value.ToStr()))
            {
                string key = rule.value.ToStr().Substring(1, rule.value.ToStr().Length - 2);
                rule.value = SysContext.GetVariableValue(key);
            }
            stringBuilder.Append(leftToken + rule.field + rightToken);
            if (rule.op == null)
            {
                rule.op = "equal";
            }
            stringBuilder.Append(GetOperatorQueryText(rule.op));
            string a = rule.op.ToLower();
            if (a == "contains")
            {
                a = "like";
            }
            if (a == "like" || a == "endwith" || a == "notlike" || a == "notendwith")
            {
                string text2 = rule.value.ToString();
                if (!text2.StartsWith(likeToken.ToString()))
                {
                    text2 = DoWithSens(text2);
                    rule.value = likeToken + text2;
                }
            }
            if (a == "like" || a == "startwith" || a == "notlike" || a == "notstartwith")
            {
                string text2 = rule.value.ToString();
                if (!text2.EndsWith(likeToken.ToString()))
                {
                    text2 = DoWithSens(text2);
                    rule.value = text2 + likeToken;
                }
            }
            if (a == "in" || a == "notin")
            {
                string[] array = rule.value.ToString().Split(';');
                bool flag = false;
                stringBuilder.Append("(");
                string[] array2 = array;
                foreach (string text2 in array2)
                {
                    if (flag)
                    {
                        stringBuilder.Append(",");
                    }
                    stringBuilder.Append(paramPrefixToken + AddRuleParms(text2, rule.type));
                    flag = true;
                }
                stringBuilder.Append(")");
            }
            else if (a != "isnull" && a != "isnotnull")
            {
                stringBuilder.Append(paramPrefixToken + AddRuleParms(rule.value, rule.type));
            }
            return stringBuilder.ToString();
        }

        private string DoWithSens(string str)
        {
            if (str == null)
            {
                return str;
            }
            str = str.ToLower().Trim();
            str = str.Replace("exec", "");
            str = str.Replace("delete", "");
            str = str.Replace("master", "");
            str = str.Replace("truncate", "");
            str = str.Replace("declare", "");
            str = str.Replace("create", "");
            str = str.Replace("update", "");
            str = str.Replace("select", "");
            return str;
        }

        private string AddRuleParms(object ruleValue, string ruleType)
        {
            string result = Parms.Count.ToString();
            object obj = ruleValue;
            if (ruleType.EqualsTo("int", true) || ruleType.EqualsTo("digits", true))
            {
                obj = obj.ToInt();
            }
            else if (ruleType.EqualsTo("float", true) || ruleType.EqualsTo("number", true))
            {
                obj = obj.ToDecimal();
            }
            Parms.Add(obj);
            return result;
        }

        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("CommandText:");
            stringBuilder.Append(CommandText);
            stringBuilder.AppendLine();
            stringBuilder.AppendLine("Parms:");
            for (int i = 0; i < Parms.Count; i++)
            {
                object arg = Parms[i];
                stringBuilder.AppendLine(string.Format("{0}:{1}", i, arg));
            }
            return stringBuilder.ToString();
        }

        public static string GetOperatorQueryText(string op)
        {
            switch (op.ToLower())
            {
                case "add":
                    return " + ";
                case "bitwiseand":
                    return " & ";
                case "bitwisenot":
                    return " ~ ";
                case "bitwiseor":
                    return " | ";
                case "bitwisexor":
                    return " ^ ";
                case "divide":
                    return " / ";
                case "equal":
                    return " = ";
                case "greater":
                    return " > ";
                case "greaterorequal":
                case "greaterthanorequal":
                    return " >= ";
                case "isnull":
                    return " is null ";
                case "isnotnull":
                    return " is not null ";
                case "less":
                    return " < ";
                case "lessorequal":
                case "lessthanorequal":
                    return " <= ";
                case "notstartwith":
                    return " not like ";
                case "notendwith":
                    return " not like ";
                case "notlike":
                    return " not like ";
                case "like":
                    return " like ";
                case "contains":
                    return " like ";
                case "startwith":
                    return " like ";
                case "endwith":
                    return " like ";
                case "modulo":
                    return " % ";
                case "multiply":
                    return " * ";
                case "notequal":
                    return " <> ";
                case "subtract":
                    return " - ";
                case "and":
                    return " and ";
                case "or":
                    return " or ";
                case "in":
                    return " in ";
                case "notin":
                    return " not in ";
                default:
                    return " = ";
            }
        }

    }
}
