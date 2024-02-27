namespace api.Areas.Categories.Models;

public class ListingRecipe
{
    public int Order { get; set; }

    public string Name { get; set; } = string.Empty;

    public string RecipeId { get; set; } = string.Empty;

    public string? ImageUrl { get; set; }

    public string? Notes { get; set; }
}