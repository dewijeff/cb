using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Repositories.Contracts;

public interface IReadOnlyCategoryRepository
{
    Task<IEnumerable<ListingCategory>> GetCategories(CancellationToken cancellationToken);
}