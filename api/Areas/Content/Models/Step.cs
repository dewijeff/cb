using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Content.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class Step
{
    [BsonElement("order")]
    public int Order { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("instructions")]
    public string? Instructions { get; set; }

    [BsonElement("imagePath")]
    public string? ImagePath { get; set; }
}