using System;
using System.ComponentModel;

namespace FastDev.Common
{
	[EditorBrowsable(EditorBrowsableState.Never)]
	public interface IHideObjectMembers
	{
		[EditorBrowsable(EditorBrowsableState.Never)]
		new Type GetType();

		[EditorBrowsable(EditorBrowsableState.Never)]
		new int GetHashCode();

		[EditorBrowsable(EditorBrowsableState.Never)]
		new string ToString();

		[EditorBrowsable(EditorBrowsableState.Never)]
		new bool Equals(object obj);
	}
}
