using api.Areas.Ingredients.Models;

namespace api.Areas.Ingredients.Services;

public class IngredientDomainService : IIngredientDomainService
{
    private readonly IIngredientRepository _ingredientRepository;

    public IngredientDomainService(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
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
        return await _ingredientRepository.DeleteIngredient(id, cancellationToken);
    }
}
