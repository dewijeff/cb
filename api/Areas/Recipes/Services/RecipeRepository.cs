using api.Areas.Recipes.Models;
using api.Shared;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Recipes.Services;

public class RecipeRepository : IRecipeRepository
{
    public async Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Recipe>();

        var filter = Builders<Recipe>.Filter.Eq("_id", ObjectId.Parse(id));

        var recipe = await collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return recipe;
    }

    public async Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Recipe>();

        var options = new InsertOneOptions();

        await collection.InsertOneAsync(recipe, options, cancellationToken);

        // id should now be the new insert id? (according to the documentation)
        return recipe;
    }

    public Task<Recipe?> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<Recipe?> DeleteRecipe(string id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}