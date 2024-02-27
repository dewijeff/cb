using api.Areas.Recipes.Models;

namespace api.Areas.Ingredients.Services;

public interface IIngredientRepository
{
    Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientId, CancellationToken cancellationToken);

    Task<IEnumerable<Ingredient>> GetIngredients(CancellationToken cancellationToken);
}