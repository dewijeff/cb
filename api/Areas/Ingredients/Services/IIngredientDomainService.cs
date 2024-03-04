using api.Areas.Ingredients.Models;

namespace api.Areas.Ingredients.Services;

public interface IIngredientDomainService
{
    Task<Ingredient> AddIngredient(Ingredient ingredient, CancellationToken cancellationToken);

    Task<long> EditIngredient(Ingredient ingredient, CancellationToken cancellationToken);

    Task<bool> DeleteIngredient(string id, CancellationToken cancellationToken);
}
