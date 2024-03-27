using api.Areas.Categories.Models;
using api.Areas.Categories.Services;
using api.Areas.Ingredients.Services;
using api.Areas.Recipes.Models;
using api.Shared.Extensions;
using System.ComponentModel.DataAnnotations;

namespace api.Areas.Recipes.Services;

public class RecipeDomainService : IRecipeDomainService
{
    private readonly IRecipeRepository _recipeRepository;
    private readonly IIngredientRepository _ingredientRepository;
    private readonly ICategoryRepository _categoryRepository;

    public RecipeDomainService(
        IRecipeRepository recipeRepository,
        IIngredientRepository ingredientRepository,
        ICategoryRepository categoryRepository)
    {
        _recipeRepository = recipeRepository;
        _ingredientRepository = ingredientRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken)
    {
        var recipe = await _recipeRepository.GetRecipe(id, cancellationToken);

        if (recipe == null)
            return null;

        var fullRecipe = await AddIngredientDataToRecipeIngredients(recipe, cancellationToken);

        return fullRecipe;
    }

    public async Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken)
    {
        var result = await _recipeRepository.AddRecipe(recipe, cancellationToken);

        if (result == null) return null;

        // Add the recipe to the category associated with it.
        if (result.CategoryId != null)
        {
            // move this to a category domain service method to add recipe to category, and another method to remove recipe from category on delete.  This is a category function, not a recipe function.

            var category = await _categoryRepository.GetCategoryById(recipe.CategoryId!, cancellationToken);

            if (category != null)
            {
                category.Recipes = category.Recipes.Append(new ListingRecipe { Name = recipe.Name, RecipeId = result.Id! });

                await _categoryRepository.EditCategory(category, cancellationToken);
            }
        }

        var fullRecipe = await AddIngredientDataToRecipeIngredients(result, cancellationToken);

        return fullRecipe;
    }

    public async Task<Recipe?> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken)
    {
        var result = await _recipeRepository.UpdateRecipe(id, recipe, cancellationToken);

        if (result == null) return null;

        var categories = (await _categoryRepository.GetCategories(cancellationToken)).ToList();
        var recipesDictionary = categories
            .SelectMany(x => x.Recipes.Select(y => new { y.RecipeId, CategoryId = x.Id }))
            .ToDictionary(x => x.RecipeId, x => x.CategoryId);

        recipesDictionary.TryGetValue(id, out var originalRecipeCategory);
        if (originalRecipeCategory != recipe.CategoryId)
        {
            if (originalRecipeCategory != null)
            {
                var originalCategory = await _categoryRepository.GetCategoryById(originalRecipeCategory, cancellationToken);

                // TODO: @JXD - This feels like it is harder than it should be - what am I missing?
                var newRecipesList = originalCategory.Recipes.ToList();
                newRecipesList.Remove(originalCategory.Recipes.First(x => x.RecipeId == recipe.Id));
                originalCategory.Recipes = newRecipesList;
                await _categoryRepository.EditCategory(originalCategory, cancellationToken);
            }

            var newCategory = await _categoryRepository.GetCategoryById(recipe.CategoryId!, cancellationToken);

            newCategory.Recipes = newCategory.Recipes.Append(new ListingRecipe { Name = recipe.Name, RecipeId = recipe.Id! });

            await _categoryRepository.EditCategory(newCategory, cancellationToken);
        }

        var fullRecipe = await AddIngredientDataToRecipeIngredients(result, cancellationToken);

        return fullRecipe;
    }

    public async Task<bool> DeleteRecipe(string id, CancellationToken cancellationToken)
    {
        var recipeDeleted = await _recipeRepository.DeleteRecipe(id, cancellationToken);

        if (!recipeDeleted)
            return false;

        // make sure to remove it from the category also.
        // get categories containing recipe (should only be one, but just do all of them)
        var categories = (await _categoryRepository.GetCategoriesByRecipeId(id, cancellationToken)).EmptyIfNull();

        foreach (var category in categories)
        {
            var recipesToRemove = category.Recipes.Where(x => x.RecipeId == id).EmptyIfNull();

            var recipes = category.Recipes.ToList();
            foreach (var recipeToRemove in recipesToRemove)
            {
                recipes.Remove(recipeToRemove);
            }

            category.Recipes = recipes;

            var editedCategoryCount = await _categoryRepository.EditCategory(category, cancellationToken);
            if (editedCategoryCount != 1)
            {
                return false; // This is probably not the best thing to do, but it means something went wrong
            }
        }

        return true;
    }

    private async Task<Recipe> AddIngredientDataToRecipeIngredients(Recipe recipe, CancellationToken cancellationToken)
    {
        var allIngredients =
            recipe.IngredientGroups.SelectMany(x => x.RecipeIngredients.EmptyIfNull().Select(y => y.IngredientId)).EmptyIfNull().ToHashSet();

        if (allIngredients.Any())
        {
            var ingredients = (await _ingredientRepository.GetIngredients(allIngredients.EmptyIfNull(), cancellationToken)).EmptyIfNull().Where(x => x.Id != null).ToDictionary(x => x.Id!);
            foreach (var ingredientGroup in recipe.IngredientGroups)
            {
                foreach (var recipeIngredient in ingredientGroup.RecipeIngredients)
                {
                    recipeIngredient.Ingredient = ingredients.TryGetValue(recipeIngredient.IngredientId, out var ingredient) ? ingredient : null;
                }
            }
        }

        return recipe;
    }
}