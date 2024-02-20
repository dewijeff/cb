namespace api.Areas.Content.Models;

public class StepGroup
{
    public int Order { get; set; }

    public string Name { get; set; } = string.Empty;

    public IEnumerable<Step> Steps { get; set; } = Enumerable.Empty<Step>();
}