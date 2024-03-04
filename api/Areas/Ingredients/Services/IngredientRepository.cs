using api.Areas.Ingredients.Models;
using api.Shared;
using api.Shared.Extensions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Ingredients.Services;

public class IngredientRepository : IIngredientRepository
{
    public async Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientIds, CancellationToken cancellationToken)
    {
        // TODO: @JXD - might be more efficient to just pull all of them and use what you need vs. doing the Filter.In - not sure.
        var collection = MongoUtility.GetCollection<Ingredient>();

        var objectIds = ingredientIds.EmptyIfNull().Select(ObjectId.Parse);

        var filter = Builders<Ingredient>.Filter.In("_id", objectIds);

        var ingredients = await collection.Find(filter).ToListAsync(cancellationToken);

        return ingredients;
    }

    public async Task<IEnumerable<Ingredient>> GetIngredients(CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Ingredient>();
        var ingredients = await collection.Find(_ => true).ToListAsync(cancellationToken);

        return ingredients;
    }

    public async Task<Ingredient> AddIngredient(Ingredient ingredient, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Ingredient>();

        await collection.InsertOneAsync(ingredient, new InsertOneOptions(), cancellationToken);

        return ingredient;
    }

    public async Task<long> EditIngredient(Ingredient ingredient, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Ingredient>();

        var filter = Builders<Ingredient>.Filter.Eq(x => x.Id, ingredient.Id);
        // TODO: DO I really want to do a replace (I think so?) vs updating or some kind of merge?
        var results = await collection.ReplaceOneAsync(filter, ingredient, new ReplaceOptions(), cancellationToken);

        return results.ModifiedCount;
    }

    public async Task<bool> DeleteIngredient(string id, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Ingredient>();

        var result = await collection.DeleteOneAsync(id, cancellationToken);

        return result.DeletedCount > 0;
    }
}