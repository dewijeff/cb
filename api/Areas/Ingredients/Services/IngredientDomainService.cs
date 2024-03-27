using api.Areas.Ingredients.Models;
using api.Areas.Recipes.Services;

namespace api.Areas.Ingredients.Services;

public class IngredientDomainService : IIngredientDomainService
{
    private readonly IIngredientRepository _ingredientRepository;
    private readonly IRecipeRepository _recipeRepository;

    public IngredientDomainService(
        IIngredientRepository ingredientRepository,
        IRecipeRepository recipeRepository)
    {
        _ingredientRepository = ingredientRepository;
        _recipeRepository = recipeRepository;
    }

    public async Task<Ingredient> AddIngredient(Ingredient ingredient, CancellationToken cancellationToken)
    {
        // Any domain validation happens here

        Ingredient result;
        try
        {
            result = await _ingredientRepository.AddIngredient(ingredient, cancellationToken);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return result;
    }

    public async Task<long> EditIngredient(Ingredient ingredient, CancellationToken cancellationToken)
    {
        return await _ingredientRepository.EditIngredient(ingredient, cancellationToken);
    }

    public async Task<bool> DeleteIngredient(string id, CancellationToken cancellationToken)
    {
        // Verify the ingredient can be deleted - it must not be being used by any recipe
        var recipesUsingIngredient = await _recipeRepository.GetRecipesUsingIngredient(id, cancellationToken);
        if (recipesUsingIngredient.Any())
            return false;

        return await _ingredientRepository.DeleteIngredient(id, cancellationToken);
    }
}
