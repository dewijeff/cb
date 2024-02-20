namespace api.Areas.Content.Models;

public class Ingredient
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool HideUnit { get; set; }
    public string? ImagePath { get; set; }
    public string? Note { get; set; }
    // calories per 100g
    // grams per cup (average) - to allow conversion between units
}