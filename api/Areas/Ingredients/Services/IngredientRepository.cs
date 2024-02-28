using api.Areas.Ingredients.Models;
using api.Shared;
using api.Shared.Extensions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Ingredients.Services;

public class IngredientRepository : IIngredientRepository
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

    public async Task<IEnumerable<Ingredient>?> GetIngredients(IEnumerable<string> ingredientIds, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Ingredient>();

        var objectIds = ingredientIds.EmptyIfNull().Select(ObjectId.Parse);

        var filter = Builders<Ingredient>.Filter.In("_id", objectIds);

        var ingredients = await collection.Find(filter).ToListAsync(cancellationToken);

        // TODO: @JXD - cache these so we don't have to get them from the database again? if I do that - how do you trigger invalidation (hard problem #2)

        return ingredients;
    }

    public async Task<IEnumerable<Ingredient>> GetIngredients(CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Ingredient>();
        var ingredients = await collection.Find(_ => true).ToListAsync(cancellationToken);

        return ingredients;
    }
}