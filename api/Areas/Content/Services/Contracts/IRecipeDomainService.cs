using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Contracts;

public interface IRecipeDomainService
{
    public Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken);
}