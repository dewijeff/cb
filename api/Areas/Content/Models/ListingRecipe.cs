namespace api.Areas.Content.Models
{
    public class ListingRecipe
    {
        public string Name { get; set; } = string.Empty;

        public string RecipeId { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }

        public string? Notes { get; set; }
    }
}
