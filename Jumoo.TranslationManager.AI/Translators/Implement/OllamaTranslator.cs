using Jumoo.TranslationManager.AI.Models;

using Microsoft.Extensions.AI;
using Microsoft.Extensions.Logging;
using OllamaSharp;

using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

[RequiredAIAdditionalOption("ollamaUrl")]
[RequiredAIAdditionalOption("ollamaModel")]
[Weight(400)]
public class OllamaTranslator : AITranslatorBase, IAITranslator
{
    public OllamaTranslator(ILogger<AITranslatorBase> logger) : base(logger)
    {
    }

    public override string Alias => "OllamaTranslator";

    public string Name => "Ollama translator";

    public Task Initialize(AITranslatorRequestOptions options)
    {
        var url = options.Options.GetAdditionalOption<string?>("ollamaUrl", null);
        if (string.IsNullOrEmpty(url)) throw new Exception("No URL provided");

        var model = options.Options.GetAdditionalOption<string?>("ollamaModel", null);  
        if (string.IsNullOrEmpty(model)) throw new Exception("No model provided");

        client = new OllamaApiClient(new Uri(url), model);

        return Task.CompletedTask;
    }

    public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        if (client is null) return new AITranslationValueResult<List<string>>();

        var prompts = GetBasePrompts(text, options);

        var chatOptions = new ChatOptions
        {
            FrequencyPenalty = options.Options.FrequencyPenalty ?? 0,
            Temperature = options.Options.Temperature ?? 0,
            PresencePenalty = options.Options.PresencePenalty ?? 0,
            TopP = options.Options.NucleusSamplingFactor ?? 0,
            Seed = options.Options.Seed,
            TopK = options.Options.TopK
        };

        return await GetBaseResponseAsync(prompts, chatOptions, options, options.Options.GetAdditionalOption<string>("ollamaModel", string.Empty));
    }
}