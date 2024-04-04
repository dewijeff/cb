using api.Shared;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace api.Areas.Auth.Helpers;

// TODO: @JLD - this path was not working - maybe it works in .Net 7 or 8? - play and delete this.  clever though.
public class JwtBearerOptionsSetup : IConfigureOptions<JwtBearerOptions>
{
    private readonly JwtOptions _jwtOptions;

    public JwtBearerOptionsSetup(IOptions<JwtOptions> jwtOptions)
    {
        _jwtOptions = jwtOptions.Value;
    }

    public void Configure(JwtBearerOptions options)
    {
        var jwtSecretKey = Environment.GetEnvironmentVariable(CookbookConstants.JwtSecretVariable) ?? throw new Exception("Jwt Configuration Error");

        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _jwtOptions.Issuer,
            ValidAudience = _jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSecretKey))
        };
    }
}
