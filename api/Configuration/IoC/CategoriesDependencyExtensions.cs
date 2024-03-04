using api.Areas.Categories.Services;

namespace api.Configuration.IoC;

public static class CategoriesDependencyExtensions
{
    public static IServiceCollection AddCategoriesServices(this IServiceCollection @this)
    {
        @this.AddScoped<ICategoryRepository, CategoryRepository>();
        @this.AddScoped<ICategoryDomainService, CategoryDomainService>();

        return @this;
    }
}
