using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Categories.Models;

[BsonIgnoreExtraElements]
public class ListingCategory
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("order")]
    public int Order { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("notes")]
    public string? Notes { get; set; }

    [BsonElement("recipes")]
    public IEnumerable<ListingRecipe> Recipes { get; set; } = Enumerable.Empty<ListingRecipe>();
}