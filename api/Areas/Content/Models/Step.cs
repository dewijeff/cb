namespace api.Areas.Content.Models;

public class Step
{
    public int Order { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Instructions { get; set; }

    public string? ImagePath { get; set; }
}