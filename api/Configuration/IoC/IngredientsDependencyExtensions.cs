using api.Areas.Ingredients.Services;

namespace api.Configuration.IoC;

public static class IngredientsDependencyExtensions
{
    public static IServiceCollection AddIngredientsServices(this IServiceCollection @this)
    {
        @this.AddScoped<IIngredientRepository, IngredientRepository>();
        @this.AddScoped<IIngredientDomainService, IngredientDomainService>();

        return @this;
    }
}
