using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Categories.Models;

[BsonIgnoreExtraElements]
public class ListingRecipe
{
    [BsonElement("order")]
    public int Order { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("recipeId")]
    public string RecipeId { get; set; } = string.Empty;

    [BsonElement("ImageUrl")]
    public string? ImageUrl { get; set; }

    [BsonElement("notes")]
    public string? Notes { get; set; }
}