using Jumoo.TranslationManager.AI;

#if UMB_13_OR_LESS
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

[JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
#endif
public class AIConnectorDefaults
{
    public string Translator { get; set; } = AIConstants.Defaults.Translator;
    public int Throttle { get; set; } = AIConstants.Defaults.Throttle;
    public string Model { get; set; } = AIConstants.Defaults.Model;
    public string Prompt { get; set; } = AIConstants.Defaults.Prompt;
    public int MaxTokens { get; set; } = AIConstants.Defaults.MaxTokens;
    public int Temperature { get; set; } = AIConstants.Defaults.Temperature;
    public int FrequencyPenalty { get; set; } = AIConstants.Defaults.FrequencyPenalty;
    public int PresencePenalty { get; set; } = AIConstants.Defaults.PresencePenalty;
    public int NucleusSamplingFactor { get; set; } = AIConstants.Defaults.NucleusSamplingFactor;
    public bool Split { get; set; } = AIConstants.Defaults.Split;

    public bool AsHtml { get; set; } = AIConstants.Defaults.AsHtml;


}
