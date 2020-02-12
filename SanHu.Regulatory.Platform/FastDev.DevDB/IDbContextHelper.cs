using System.Collections;

namespace FastDev.DevDB
{
	public interface IDbContextHelper
	{
		PagedData Page(long page, long itemsPerPage, string sql, params object[] args);

		IList Fetch(string sql, params object[] args);

		object FirstOrDefault(string sql, params object[] args);

		IList SkipTake(long skip, long take, string sql, params object[] args);

		int Delete(string sql, params object[] args);

		bool Exist(string sql, params object[] args);
	}
}
