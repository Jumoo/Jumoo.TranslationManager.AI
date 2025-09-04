using Jumoo.TranslationManager.AI.Models;

using Microsoft.Extensions.AI;

using OllamaSharp;

namespace Jumoo.TranslationManager.AI.Translators.Implement;
public class OllamaTranslator : IAITranslator
{
    public string Alias => "OllamaTranslator";

    public string Name => "ollama translator";

    IChatClient? _client; 

    public Task Initialize(AITranslatorRequestOptions options)
    {
        var url = options.Options.GetAdditionalOption<string?>("ollamaUrl", null);
        if (string.IsNullOrEmpty(url)) throw new Exception("No URL provided");

        var model = options.Options.GetAdditionalOption<string?>("ollamaModel", null);  
        if (string.IsNullOrEmpty(model)) throw new Exception("No model provided");

        _client = new OllamaApiClient(new Uri(url), model);

        return Task.CompletedTask;
    }

    public bool IsValid(AIOptions options)
        => true;

    public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        if (_client is null) return new AITranslationValueResult<List<string>>();

        var prompts = new List<ChatMessage>(text.Count());
        foreach (var item in text)
        {
            prompts.Add(new ChatMessage(ChatRole.User, options.GetPrompt(item)));
        }

        var chatOptions = new ChatOptions
        {
            FrequencyPenalty = options.Options.FrequencyPenalty ?? 0,
            Temperature = options.Options.Temperature ?? 0,
            PresencePenalty = options.Options.PresencePenalty ?? 0,
            TopP = options.Options.NucleusSamplingFactor ?? 0,
            Seed = options.Options.Seed,
            TopK = options.Options.TopK
        };

        var result = await _client.GetResponseAsync(prompts, chatOptions);

        return new AITranslationValueResult<List<string>>()
        {
            Value = result.Messages.Select(x => x.Text).ToList(),
            AIResult = new AITranslationResult()
            {
                ModelUsed = result.ModelId ?? options.Options.Model,
                TranslatorUsed = Alias,
                TokensUsed = result.Usage?.TotalTokenCount ?? 0,
                InputTokens = result.Usage?.InputTokenCount ?? 0,
                OutputTokens = result.Usage?.OutputTokenCount ?? 0,
            }
        };
    }
}
