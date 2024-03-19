using api.Areas.Categories.Models;

namespace api.Areas.Categories.Services;

public interface ICategoryDomainService
{
    Task<ListingCategory> AddCategory(ListingCategory category, CancellationToken cancellationToken);

    Task<ListingCategory> EditCategory(ListingCategory category, CancellationToken cancellationToken);

    Task<bool> DeleteCategory(string id, CancellationToken cancellationToken);
}
