using api.Areas.Categories.Models;

namespace api.Areas.Categories.Services;

public interface ICategoryDomainService
{
    ListingCategory AddCategory(ListingCategory category, CancellationToken cancellationToken);

    ListingCategory EditCategory(ListingCategory category, CancellationToken cancellationToken);

    bool DeleteCategory(string id, CancellationToken cancellationToken);
}
