namespace api.Shared.Extensions;

public static class EnumerableExtensions
{
    public static IEnumerable<T> EmptyIfNull<T>(this IEnumerable<T>? list)
    {
        return list ?? Enumerable.Empty<T>();
    }
}