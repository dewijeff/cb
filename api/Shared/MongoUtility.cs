using api.Areas.Categories.Models;
using api.Areas.Ingredients.Models;
using api.Areas.Recipes.Models;
using MongoDB.Driver;

namespace api.Shared;

public static class MongoUtility
{
    private const string UriEnvVariable = "MONGO_COOKBOOK_URI";
    private const string CookbookDbString = "cb";

    public static IMongoCollection<T> GetCollection<T>()
    {
        var connectionString = Environment.GetEnvironmentVariable(UriEnvVariable);
        if (connectionString == null)
            throw new Exception("Invalid Mongo Connection String");

        var client = new MongoClient(connectionString);

        var collectionForType = GetCollectionName<T>();

        return client.GetDatabase(CookbookDbString).GetCollection<T>(collectionForType);
    }

    private static string GetCollectionName<T>()
    {
        if (typeof(T) == typeof(Ingredient))
            return "ingredients";
        if (typeof(T) == typeof(Recipe))
            return "recipes";
        if (typeof(T) == typeof(ListingCategory))
            return "categories";

        throw new InvalidOperationException("Unknown collection for Type");
    }
}
