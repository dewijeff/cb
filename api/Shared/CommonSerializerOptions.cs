using System.Text.Json.Serialization;
using System.Text.Json;

namespace api.Shared
{
    public static class CommonSerializerOptions
    {
        public static JsonSerializerOptions SerializerOptions { get; } = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };
    }
}
