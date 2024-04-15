using api.Areas.Categories.Models;

namespace api.Areas.Categories.Services;

public interface ICategoryDomainService
{
    Task<bool> DeleteCategory(string id, CancellationToken cancellationToken);
}
