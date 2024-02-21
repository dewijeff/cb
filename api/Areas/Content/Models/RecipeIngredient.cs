using api.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Content.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class RecipeIngredient
{
    [BsonElement("order")]
    public int Order { get; set; }

    [BsonElement("ingredients_id"), BsonRepresentation(BsonType.ObjectId)]
    public string IngredientId { get; set; } = string.Empty;

    public Ingredient? Ingredient { get; set; }

    [BsonElement("amount")]
    public decimal Amount { get; set; }

    [BsonElement("unit")]
    public MeasurementUnit Unit { get; set; }

    [BsonElement("notes")]
    public string? Notes { get; set; }
}