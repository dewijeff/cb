using api.Areas.Categories.Models;
using api.Shared;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Categories.Services;

public class CategoryRepository : ICategoryRepository
{
    public async Task<IEnumerable<ListingCategory>> GetCategories(CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<ListingCategory>();
        var categories = await collection.Find(_ => true).ToListAsync(cancellationToken);

        return categories;
    }

    public async Task<ListingCategory> GetCategoryById(string id, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<ListingCategory>();

        var filter = Builders<ListingCategory>.Filter.Eq(x => x.Id, id);
        var result = await collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return result;
    }

    public async Task<IEnumerable<ListingCategory>> GetCategoriesByRecipeId(
        string recipeId,
        CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<ListingCategory>();

        var filter = Builders<ListingCategory>.Filter.Eq("recipes.recipeId", recipeId);

        var result = await collection.Find(filter).ToListAsync(cancellationToken);

        return result;
    }

    public async Task<ListingCategory> AddCategory(ListingCategory category, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<ListingCategory>();

        await collection.InsertOneAsync(category, new InsertOneOptions(), cancellationToken);

        var filter = Builders<ListingCategory>.Filter.Eq("_id", ObjectId.Parse(category.Id));

        // get the result to make sure it took.  this is the new state...
        var result = await collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return result;
    }

    public async Task<long> EditCategory(ListingCategory category, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<ListingCategory>();

        var filter = Builders<ListingCategory>.Filter.Eq("_id", ObjectId.Parse(category.Id));
        var results = await collection.ReplaceOneAsync(filter, category, new ReplaceOptions(), cancellationToken);
        return results.ModifiedCount;
    }

    public async Task<bool> DeleteCategory(string id, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<ListingCategory>();

        var filter = Builders<ListingCategory>.Filter.Eq("_id", ObjectId.Parse(id));

        var result = await collection.DeleteOneAsync(filter, cancellationToken);

        return result.DeletedCount > 0;
    }
}