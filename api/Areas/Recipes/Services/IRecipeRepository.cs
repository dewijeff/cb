using api.Areas.Recipes.Models;

namespace api.Areas.Recipes.Services;

public interface IRecipeRepository
{
    Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken);

    Task<long> GetCategoryRecipeCount(string categoryId, CancellationToken cancellationToken);

    Task<IEnumerable<Recipe>> GetRecipesUsingIngredient(string ingredientId, CancellationToken cancellationToken);

    Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken);

    Task<Recipe?> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken);

    Task<bool> DeleteRecipe(string id, CancellationToken cancellationToken);
}