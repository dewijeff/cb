using api.Areas.Content.Models;
using api.Areas.Content.Services.Repositories.Contracts;
using api.Shared.Extensions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Content.Services.Repositories;

public class ReadOnlyIngredientRepository : IReadOnlyIngredientRepository
{
    private const string UriEnvVariable = "MONGO_COOKBOOK_URI";
    private const string CookbookDatabase = "cb";           // TODO: @JXD - Set these from an appsetting...
    private const string IngredientsCollection = "ingredients";

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

    public async Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientIds, CancellationToken cancellationToken)
    {
        var collection = GetIngredientCollection();

        var objectIds = ingredientIds.EmptyIfNull().Select(ObjectId.Parse);

        var filter = Builders<Ingredient>.Filter.In("_id", objectIds);

        var ingredients = await collection.Find(filter).ToListAsync(cancellationToken);

        // TODO: @JXD - cache these so we don't have to get them from the database again? if I do that - how do you trigger invalidation (hard problem #2)

        return ingredients;
    }

    // TODO: Move this to a generic at the database layer that takes a type and a collectionName string and returns the collection for use across all repositories
    private IMongoCollection<Ingredient> GetIngredientCollection()
    {
        var connectionString = Environment.GetEnvironmentVariable(UriEnvVariable);
        if (connectionString == null)
            throw new Exception("Invalid Mongo Connection String");

        var client = new MongoClient(connectionString);
        return client.GetDatabase(CookbookDatabase).GetCollection<Ingredient>(IngredientsCollection);
    }
    // TODO: method to get ALL ingredients for editor...
}