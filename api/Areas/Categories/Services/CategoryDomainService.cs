﻿using api.Areas.Recipes.Services;

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

    public async Task<bool> DeleteCategory(string id, CancellationToken cancellationToken)
    {
        var recipeCountForCategory = await _recipeRepository.GetCategoryRecipeCount(id, cancellationToken); // can just check the category children too... there will be no way to fix this.

        if (recipeCountForCategory > 0)
            return false;

        var result =  await _categoryRepository.DeleteCategory(id, cancellationToken);

        return result;
    }
}
