using api.Areas.Ingredients.Services;
using api.Areas.Recipes.Models;
using api.Shared.Extensions;
using MongoDB.Driver;

namespace api.Areas.Recipes.Services;

public class RecipeDomainService : IRecipeDomainService
{
    private readonly IRecipeRepository _recipeRepository;
    private readonly IIngredientRepository _ingredientRepository;

    public RecipeDomainService(
        IRecipeRepository recipeRepository,
        IIngredientRepository ingredientRepository)
    {
        _recipeRepository = recipeRepository;
        _ingredientRepository = ingredientRepository;
    }

    public async Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken)
    {
        var recipe = await _recipeRepository.GetRecipe(id, cancellationToken);

        if (recipe == null)
            return null;

        var allIngredients =
            recipe.IngredientGroups.SelectMany(x => x.RecipeIngredients.Select(y => y.IngredientId)).EmptyIfNull().ToHashSet();

        if (allIngredients?.Any() == true)
        {
            var ingredients = (await _ingredientRepository.GetIngredients(allIngredients.EmptyIfNull(), cancellationToken)).EmptyIfNull().ToDictionary(x => x.Id);
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

    public async Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken)
    {
        // TODO: @JXD - why even do this in a domain service.
        var result = await _recipeRepository.AddRecipe(recipe, cancellationToken);

        // TODO: @JXD - add the recipe to the category associated with it. (string match?)

        return result;
    }

    public Task<Recipe?> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task DeleteRecipe(string id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}