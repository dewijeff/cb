using MongoDB.Bson.Serialization.Attributes;

namespace api.Areas.Recipes.Models;

[BsonIgnoreExtraElements]
[BsonNoId]
public class IngredientGroup
{
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("recipeIngredients")]
    public IEnumerable<RecipeIngredient> RecipeIngredients { get; set; } = Enumerable.Empty<RecipeIngredient>();
}