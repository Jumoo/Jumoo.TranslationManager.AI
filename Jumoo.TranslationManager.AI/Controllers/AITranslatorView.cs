#if UMB_13_OR_LESS
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

[JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
#endif
public class AITranslatorView
{
    public required string Name { get; set; }
    public required string Alias { get; set; }
}
