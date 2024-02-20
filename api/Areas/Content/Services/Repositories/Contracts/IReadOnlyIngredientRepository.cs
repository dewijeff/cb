using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Repositories.Contracts;

public interface IReadOnlyIngredientRepository
{
    Task<Ingredient?> GetIngredient(string ingredientId, CancellationToken cancellationToken);

    Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientId, CancellationToken cancellationToken);
}