using Jumoo.TranslationManager.Core.Models;

namespace Jumoo.TranslationManager.AI.Models;

#if UMB_13_OR_LESS
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

[JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
#endif
public class AITranslationResult
{
    public string TranslatorUsed { get; set; } = string.Empty;
    public long TokensUsed { get; set; }
    public string ModelUsed { get; set; } = string.Empty;
    public long InputTokens { get; set; }
    public long OutputTokens { get; set; }
    public string ExtraMessage { get; set; } = string.Empty;

    public void AppendResult(AITranslationResult result)
    {
        TokensUsed += result.TokensUsed;
        if (string.IsNullOrWhiteSpace(result.ModelUsed) is false)
        {
            ModelUsed = result.ModelUsed;
        }
        InputTokens += result.InputTokens;
        OutputTokens += result.OutputTokens;
        ExtraMessage = result.ExtraMessage;
    }
}

#if UMB_13_OR_LESS
[JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
#endif
public class AITranslationValueResult<TResult>
{
    public TResult? Value { get; set; } = default;

    public AITranslationResult AIResult { get; set; } = new AITranslationResult();
}

public static class AITranslationValueResultExtensions
{
    public static void AppendResult(this AITranslationValueResult<string> item, AITranslationValueResult<string> result)
    {
        item.Value += result.Value;
        item.AIResult.AppendResult(result.AIResult);
    }

    public static void AppendResult(this AITranslationValueResult<List<string>> item, AITranslationValueResult<List<string>> result)
    {
        if (result.Value != null && item.Value != null)
            item.Value.AddRange(result.Value);
        item.AIResult.AppendResult(result.AIResult);
    }
    public static void AppendResult(this AITranslationValueResult<TranslationValue> item, AITranslationValueResult<string> result, bool translated)
    {
        if (item.Value != null)
        {
            item.Value.Value = result.Value ?? string.Empty;
            item.Value.Translated = translated;
        }
        item.AIResult.AppendResult(result.AIResult);
    }

}