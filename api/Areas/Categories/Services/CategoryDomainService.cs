using api.Areas.Categories.Models;
using api.Areas.Recipes.Services;

namespace api.Areas.Categories.Services;

public sealed class CategoryDomainService : ICategoryDomainService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IRecipeRepository _recipeRepository;

    public CategoryDomainService(
        ICategoryRepository categoryRepository,
        IRecipeRepository recipeRepository)
    {
        _categoryRepository = categoryRepository;
        _recipeRepository = recipeRepository;
    }

    public Task<ListingCategory> AddCategory(ListingCategory category, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<ListingCategory> EditCategory(ListingCategory category, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteCategory(string id, CancellationToken cancellationToken)
    {
        var recipeCountForCategory = await _recipeRepository.GetCategoryRecipeCount(id, cancellationToken);

        if (recipeCountForCategory > 0)
            return false;

        var result =  await _categoryRepository.DeleteCategory(id, cancellationToken);

        return result;
    }
}
