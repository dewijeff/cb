using api.Areas.Categories.Services;
using api.Areas.Ingredients.Services;
using api.Areas.Recipes.Services;

namespace api.Configuration.IoC;

public static class ContentDependencyExtensions
{
    public static IServiceCollection AddContentServices(this IServiceCollection @this)
    {
        @this.AddScoped<IRecipeRepository, RecipeRepository>();
        @this.AddScoped<ICategoryRepository, CategoryRepository>();
        @this.AddScoped<IIngredientRepository, IngredientRepository>();
        @this.AddScoped<IRecipeDomainService, RecipeDomainService>();

        return @this;
    }
}