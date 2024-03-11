using api.Areas.Recipes.Models;

namespace api.Areas.Recipes.Services;

public interface IRecipeRepository
{
    public Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken);

    public Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken);

    public Task<long> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken);

    public Task<bool> DeleteRecipe(string id, CancellationToken cancellationToken);
}