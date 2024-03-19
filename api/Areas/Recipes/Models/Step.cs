using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Recipes.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class Step
{
    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("instructions")]
    public string? Instructions { get; set; }

    [BsonElement("imagePath")]
    public string? ImagePath { get; set; }
}