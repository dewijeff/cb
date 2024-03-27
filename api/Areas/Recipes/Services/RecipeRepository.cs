using api.Areas.Recipes.Models;
using api.Shared;
using api.Shared.Extensions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Recipes.Services;

public class RecipeRepository : IRecipeRepository
{
    private readonly IMongoCollection<Recipe> _collection;

    public RecipeRepository()
    {
        // TODO: @JLD - This will be converted to dependency injection in the next iteration.
        _collection = MongoUtility.GetCollection<Recipe>();
    }

    public async Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken)
    {

        var filter = Builders<Recipe>.Filter.Eq("_id", ObjectId.Parse(id));

        var recipe = await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return recipe;
    }

    public async Task<long> GetCategoryRecipeCount(string categoryId, CancellationToken cancellationToken)
    {
        var filter = Builders<Recipe>.Filter.Eq("categoryId", categoryId);

        var count = await _collection.CountDocumentsAsync(filter, new CountOptions(),cancellationToken);

        return count;
    }

    public async Task<IEnumerable<Recipe>> GetRecipesUsingIngredient(
        string ingredientId,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Recipe>.Filter.Eq("ingredientGroups.recipeIngredients.ingredients_id", ingredientId);

        var recipes = await _collection.Find(filter).ToListAsync(cancellationToken);

        return recipes.EmptyIfNull();
    }

    public async Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken)
    {
        var options = new InsertOneOptions();

        await _collection.InsertOneAsync(recipe, options, cancellationToken);

        return recipe;
    }

    public async Task<Recipe?> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken)
    {
        var filter = Builders<Recipe>.Filter.Eq("_id", ObjectId.Parse(id));
        var results = await _collection.ReplaceOneAsync(filter, recipe, new ReplaceOptions(), cancellationToken);

        if (results.ModifiedCount != 1)
            return null;

        // Could probably just return the recipe we passed in, but getting a new copy from the db guarantees the return matches what is on the db

        var recipeResult = await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);
        return recipeResult;
    }

    public async Task<bool> DeleteRecipe(string id, CancellationToken cancellationToken)
    {
        var filter = Builders<Recipe>.Filter.Eq("_id", ObjectId.Parse(id));
        var result = await _collection.DeleteOneAsync(filter, cancellationToken);

        return result.DeletedCount > 0;
    }
}