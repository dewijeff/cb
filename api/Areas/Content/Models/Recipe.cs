namespace api.Areas.Content.Models;

public class Recipe
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public IEnumerable<IngredientGroup> IngredientGroups { get; set; } = Enumerable.Empty<IngredientGroup>();

    public IEnumerable<StepGroup> StepGroups { get; set; } = Enumerable.Empty<StepGroup>();

    public string? Notes { get; set; }

    public IEnumerable<string>? Images { get; set; }

    public string? CreatedBy { get; set; }

    public string? CreatedAt { get; set; }

    public IEnumerable<string> AssociatedRecipes { get; set; } = Enumerable.Empty<string>(); // For stuff like biscuits when making sausage gravy...  kind of a yman for recipes.
}