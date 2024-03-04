using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Ingredients.Models;

[BsonIgnoreExtraElements]
public class Ingredient
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("hideUnit")]
    public bool HideUnit { get; set; }

    [BsonElement("imageUrl")]
    public string? ImageUrl { get; set; }

    [BsonElement("note")]
    public string? Note { get; set; }
    // calories per 100g
    // grams per cup (average) - to allow conversion between units
}