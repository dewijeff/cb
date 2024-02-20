using api.Shared;

namespace api.Areas.Content.Models;

public class RecipeIngredient
{
    public int Order { get; set; }

    public string IngredientId { get; set; } = string.Empty;

    public Ingredient? Ingredient { get; set; }

    public decimal Amount { get; set; }

    public MeasurementUnit Unit { get; set; }

    public string? Notes { get; set; }
}