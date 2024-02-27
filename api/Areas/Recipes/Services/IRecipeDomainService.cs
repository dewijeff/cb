using api.Areas.Recipes.Models;

namespace api.Areas.Recipes.Services;

public interface IRecipeDomainService
{
    public Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken);
}