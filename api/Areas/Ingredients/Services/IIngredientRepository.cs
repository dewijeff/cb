﻿using api.Areas.Ingredients.Models;
using api.Areas.Recipes.Models;

namespace api.Areas.Ingredients.Services;

public interface IIngredientRepository
{
    Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientId, CancellationToken cancellationToken);

    Task<IEnumerable<Ingredient>> GetIngredients(CancellationToken cancellationToken);

    Task<Ingredient> AddIngredient(Ingredient ingredient, CancellationToken cancellationToken);

    Task<long> EditIngredient(Ingredient ingredient, CancellationToken cancellationToken);

    Task<bool> DeleteIngredient(string id, CancellationToken cancellationToken);
}