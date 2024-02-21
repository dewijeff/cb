using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Content.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class StepGroup
{
    [BsonElement("order")]
    public int Order { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("steps")]
    public IEnumerable<Step> Steps { get; set; } = Enumerable.Empty<Step>();
}