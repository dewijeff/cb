using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Repositories.Contracts;

public interface IReadOnlyIngredientRepository
{
    Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientId, CancellationToken cancellationToken);
}