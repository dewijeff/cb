using Microsoft.AspNetCore.SignalR;

namespace api.Areas.Content.Models
{
    public class Recipe
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public IEnumerable<IngredientGroup> IngredientGroups { get; set; }
        public IEnumerable<StepGroup> StepGroups { get; set; }
        public string? Notes { get; set; }
        public IEnumerable<string>? Images { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedAt { get; set; }
    }
}
