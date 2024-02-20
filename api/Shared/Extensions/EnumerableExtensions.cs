namespace api.Shared.Extensions;

public static class EnumerableExtensions
{
    public static IEnumerable<T> EmptyIfNull<T>(this IEnumerable<T>? list)
    {
        return list ?? Enumerable.Empty<T>();
    }

    public static bool IsNullOrEmpty<TSource>(this IEnumerable<TSource> @this)
    {
        return @this == null || !@this.Any();
    }
}