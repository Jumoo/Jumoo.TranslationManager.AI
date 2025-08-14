using Microsoft.Extensions.AI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jumoo.TranslationManager.AI;

public class AIOptions
{
    public required string APIKey { get; set; }
    public required string Translator {  get; set; }
    public int Throttle { get; set; } = AIConstants.Defaults.Throttle;
    public bool Split { get; set; }
    public bool AsHtml { get; set; }
    public bool UseTranslationMemory { get; set; }
    public required string Model { get; set; } = AIConstants.Defaults.Model;
    public required string Prompt { get; set; } = AIConstants.Defaults.Prompt;
    public required string SystemPrompt { get; set; } = AIConstants.Defaults.Prompt;
    public int? MaxTokens { get; set; } = AIConstants.Defaults.MaxTokens;
    public float? Temperature { get; set; } = AIConstants.Defaults.Temperature;
    public float? FrequencyPenalty { get; set; } = AIConstants.Defaults.FrequencyPenalty;
    public float? PresencePenalty { get; set; } = AIConstants.Defaults.PresencePenalty;
    public float? NucleusSamplingFactor { get; set; } = AIConstants.Defaults.NucleusSamplingFactor;
    public Dictionary<string, object?> AdditionalProperties { get; set; } = [];
    public bool? AllowMultipleToolCalls { get; set; }
    public string? ConversationId { get; set; }
    public string? Instructions { get; set; }
    public long? Seed { get; set; }
    public IList<string>? StopSequences { get; set; }
    public ChatToolMode? ToolMode { get; set; }
    public IList<AITool>? Tools { get; set; }
    public int? TopK {  get; set; }
}


