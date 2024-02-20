using api.Areas.Content.Services;
using api.Areas.Content.Services.Contracts;
using api.Areas.Content.Services.Repositories;
using api.Areas.Content.Services.Repositories.Contracts;

namespace api.Configuration.IoC;

public static class ContentDependencyExtensions
{
    public static IServiceCollection AddContentServices(this IServiceCollection @this)
    {
        @this.AddScoped<IReadOnlyRecipeRepository, ReadOnlyRecipeRepository>();
        @this.AddScoped<IReadOnlyCategoryRepository, ReadOnlyCategoryRepository>();
        @this.AddScoped<IReadOnlyIngredientRepository, ReadOnlyIngredientRepository>();
        @this.AddScoped<IRecipeDomainService, RecipeDomainService>();

        return @this;
    }
}