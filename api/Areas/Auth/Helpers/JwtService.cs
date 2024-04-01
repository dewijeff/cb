using api.Areas.Auth.Models;
using api.Shared;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Areas.Auth.Helpers;

public class JwtService : IJwtService
{
    //private readonly string _secureKey = "this should probably come from something not stored in the solution lol";

    private readonly JwtOptions _options;
    private readonly string _jwtSecret;

    public JwtService(IOptions<JwtOptions> options)
    {
        _options = options.Value;
        _jwtSecret = Environment.GetEnvironmentVariable(CookbookConstants.JwtSecretVariable) ?? throw new Exception("Jwt Configuration Error");
    }

    public string Generate(User user)
    {
        // TODO: @JLD - Add Guarding
        if (user?.Id == null)
            throw new ArgumentNullException(nameof(user));

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret)),
            SecurityAlgorithms.HmacSha256Signature);

        var claims = new Claim[]
        {
            new (JwtRegisteredClaimNames.Sub, user.Id),
            new (JwtRegisteredClaimNames.Email, user.Email),
            new (IdentityData.CanEditClaimName, user.CanEdit.ToString())
        };

        var securityToken = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claims,
            null,
            DateTime.Now.AddHours(1),
            credentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public JwtSecurityToken Verify(string jwt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSecret);

        tokenHandler.ValidateToken(jwt,
            new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true
            }, out var validatedToken);

        return (JwtSecurityToken)validatedToken;
    }
}
