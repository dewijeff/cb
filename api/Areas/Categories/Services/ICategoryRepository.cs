using api.Areas.Categories.Models;

namespace api.Areas.Categories.Services;

public interface ICategoryRepository
{
    Task<IEnumerable<ListingCategory>> GetCategories(CancellationToken cancellationToken);

    Task<ListingCategory> GetCategoryById(string id, CancellationToken cancellationToken);

    Task<ListingCategory> AddCategory(ListingCategory category, CancellationToken cancellationToken);

    Task<long> EditCategory(ListingCategory category, CancellationToken cancelToken);

    Task <bool> DeleteCategory(string id, CancellationToken cancellationToken);
}