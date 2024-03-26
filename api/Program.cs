using api.Areas.Auth.Helpers;
using api.Areas.Auth.Models;
using api.Configuration.IoC;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
const string jwtSectionName = "jwt";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthServices();
builder.Services.AddRecipesServices();
builder.Services.AddIngredientsServices();
builder.Services.AddCategoriesServices();

JwtOptions jwtOptions = new JwtOptions();
builder.Configuration.GetSection(jwtSectionName).Bind(jwtOptions);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtOptions.Issuer,
        ValidAudience = jwtOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtOptions.SecretKey))
    };
});

builder.Services.AddAuthorization(o =>
{
    o.AddPolicy(IdentityData.CanEditPolicyName, p =>
        p.RequireClaim(IdentityData.CanEditClaimName, "true"));
});

builder.Services.ConfigureOptions<JwtOptionsSetup>();
//builder.Services.ConfigureOptions<JwtBearerOptionsSetup>(); // This is not working

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Allow cross origin - because I'll likely be hosting these separate until I get them on a host server that uses a reverse proxy like Nginx?
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: myAllowSpecificOrigins,
        policy =>
        {
            policy
                .WithOrigins(
                    "https://localhost:7014",
                    "https://localhost:8081",
                    "http://localhost:8081"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(myAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
