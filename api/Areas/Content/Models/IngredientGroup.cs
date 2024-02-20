namespace api.Areas.Content.Models;

public class IngredientGroup
{
    public int Order { get; set; }
    public string Name { get; set; } = string.Empty;
    public IEnumerable<RecipeIngredient> RecipeIngredients { get; set; } = Enumerable.Empty<RecipeIngredient>();
}