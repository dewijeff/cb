﻿using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Repositories.Contracts;

public interface IReadOnlyRecipeRepository
{
    public Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken);
}