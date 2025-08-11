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
    public int Throttle { get; set; }
    public bool Split { get; set; }
    public bool AsHtml { get; set; }
    public required string Model { get; set; }
    public required string Prompt { get; set; }
    public required string SystemPrompt { get; set; }
    public int? MaxTokens { get; set; }
    public float? Temperature { get; set; }
    public float? FrequencyPenalty { get; set; }
    public float? PresencePenalty { get; set; }
    public float? NucleusSamplingFactor { get; set; }
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


