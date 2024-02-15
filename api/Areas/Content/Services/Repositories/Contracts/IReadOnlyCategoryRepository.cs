using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Repositories.Contracts
{
    public interface IReadOnlyCategoryRepository
    {
        IEnumerable<ListingCategory> GetCategories();
    }
}
