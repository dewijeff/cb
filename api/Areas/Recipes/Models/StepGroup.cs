using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Recipes.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class StepGroup
{

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("steps")]
    public IEnumerable<Step> Steps { get; set; } = Enumerable.Empty<Step>();
}