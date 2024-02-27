using api.Areas.Ingredients.Services;
using api.Areas.Recipes.Models;
using api.Shared.Extensions;

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
}