using api.Areas.Ingredients.Models;
using api.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Recipes.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class RecipeIngredient
{

    [BsonElement("ingredients_id"), BsonRepresentation(BsonType.ObjectId)]
    public string IngredientId { get; set; } = string.Empty;

    [BsonIgnore]
    public Ingredient? Ingredient { get; set; }

    [BsonElement("amount")]
    public decimal Amount { get; set; }

    [BsonElement("unit")]
    public MeasurementUnit Unit { get; set; }

    [BsonElement("notes")]
    public string? Notes { get; set; }
}