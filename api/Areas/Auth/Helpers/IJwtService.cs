using api.Areas.Auth.Models;
using System.IdentityModel.Tokens.Jwt;

namespace api.Areas.Auth.Helpers;

public interface IJwtService
{
    string Generate(User user);

    JwtSecurityToken Verify(string jwt);
}
