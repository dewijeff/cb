namespace api.Areas.Content.Models
{
    public class StepGroup
    {
        public string Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public IEnumerable<Step> Steps { get; set; }
    }
}
