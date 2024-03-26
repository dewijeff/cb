using api.Areas.Auth.Helpers;
using api.Areas.Auth.Services;

namespace api.Configuration.IoC;

public static class AuthDependencyExtensions
{
    public static IServiceCollection AddAuthServices(this IServiceCollection @this)
    {
        @this.AddScoped<IUserRepository, UserRepository>();
        @this.AddScoped<IJwtService, JwtService>();

        return @this;
    }
}
