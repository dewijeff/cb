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

    [BsonElement("calPerServing")]
    public decimal CalPerServing { get; set; }

    [BsonElement("sodiumMgPerServing")]
    public decimal SodiumMgPerServing { get; set; }

    [BsonElement("gramsPerServing")]
    public decimal GramsPerServing { get; set; }

    [BsonElement("volumePerServing")]
    public decimal VolumePerServing { get; set; }

    [BsonElement("volumePerServingUnit")]
    public int VolumePerServingUnit { get; set; }
}