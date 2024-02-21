using api.Areas.Content.Models;
using api.Areas.Content.Services.Repositories.Contracts;
using MongoDB.Driver;
using MongoDB.Bson;

namespace api.Areas.Content.Services.Repositories;

public class ReadOnlyIngredientRepository : IReadOnlyIngredientRepository
{
    private readonly Dictionary<string, Ingredient> _ingredients = new ()
    {
        {
            "1",
            new Ingredient
            {
                Id = "1",
                Name = "Water",
            }
        },
        {
            "2",
            new Ingredient
            {
                Id = "2",
                Name = "Flour",
            }
        },
        {
            "3",
            new Ingredient
            {
                Id = "3",
                Name = "Milk",
                Note = "Whatever you got",
            }
        },
        {
            "4",
            new Ingredient
            {
                Id = "4",
                Name = "Yeast",
            }
        },
        {
            "5",
            new Ingredient
            {
                Id = "5",
                Name = "Sugar",
            }
        },
        {
            "6",
            new Ingredient
            {
                Id = "6",
                Name = "Egg",
                HideUnit = true,
            }
        },
        {
            "7",
            new Ingredient
            {
                Id = "7",
                Name = "Unsalted Butter",
            }
        },
        {
            "8",
            new Ingredient
            {
                Id = "8",
                Name = "Salted Butter",
            }
        },
        {
            "9",
            new Ingredient
            {
                Id = "9",
                Name = "Sodium Free Baking Powder",
            }
        },
    };

    public async Task<Ingredient?> GetIngredient(string ingredientId, CancellationToken cancellationToken)
    {
        return _ingredients.TryGetValue(ingredientId, out var ingredient) ? ingredient : null;
    }

    public async Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientIds, CancellationToken cancellationToken)
    {
        var connectionString = Environment.GetEnvironmentVariable("MONGO_COOKBOOK_URI");
        if (connectionString == null)
            throw new Exception("Invalid Mongo Connection String");

        var client = new MongoClient(connectionString);
        var collection = client.GetDatabase("cb").GetCollection<BsonDocument>("test");

        return ingredientIds.Where(_ingredients.ContainsKey)
            .Select(x => _ingredients[x])
            .ToList();
    }
}