using api.Areas.Categories.Models;

namespace api.Areas.Categories.Services;

public interface ICategoryRepository
{
    Task<IEnumerable<ListingCategory>> GetCategories(CancellationToken cancellationToken);
}