namespace api.Areas.Categories.Models;

public class ListingCategory
{
    public int Order { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Notes { get; set; }

    public IEnumerable<ListingRecipe> Recipes { get; set; } = Enumerable.Empty<ListingRecipe>();
}