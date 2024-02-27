using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Recipes.Models;

[BsonIgnoreExtraElements]
public class Recipe
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("category")]
    public string Category { get; set; } = string.Empty;

    [BsonElement("ingredientGroups")]
    public IEnumerable<IngredientGroup> IngredientGroups { get; set; } = Enumerable.Empty<IngredientGroup>();

    [BsonElement("stepGroups")]
    public IEnumerable<StepGroup> StepGroups { get; set; } = Enumerable.Empty<StepGroup>();

    [BsonElement("notes")]
    public string? Notes { get; set; }

    [BsonElement("images")]
    public IEnumerable<string>? Images { get; set; }

    [BsonElement("createdBy")]
    public string? CreatedBy { get; set; }

    [BsonElement("createdAt")]
    public string? CreatedAt { get; set; }

    [BsonElement("associatedRecipes")]
    public IEnumerable<string> AssociatedRecipes { get; set; } = Enumerable.Empty<string>(); // For stuff like biscuits when making sausage gravy...  kind of a yman for recipes.
}