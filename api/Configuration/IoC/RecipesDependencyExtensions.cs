using api.Areas.Recipes.Services;

namespace api.Configuration.IoC;

public static class RecipesDependencyExtensions
{
    public static IServiceCollection AddRecipesServices(this IServiceCollection @this)
    {
        @this.AddScoped<IRecipeRepository, RecipeRepository>();
        @this.AddScoped<IRecipeDomainService, RecipeDomainService>();

        return @this;
    }
}
