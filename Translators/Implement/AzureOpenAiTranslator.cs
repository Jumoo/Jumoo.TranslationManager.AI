using Azure.AI.OpenAI;

using Jumoo.TranslationManager.AI.Models;

using OpenAI.Chat;

using System.ClientModel;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

public class AzureOpenAiTranslator : IAITranslator
{
    public string Alias => nameof(AzureOpenAiTranslator);

    public string Name => "Azure OpenAI Translator";

    public ChatClient? chatClient;
    public Task Initialize(AITranslatorRequestOptions options)
    {
        var apiStringKey = options.Options.GetAdditionalOption<string?>("azureKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
            throw new Exception("No azure api key");

        if (string.IsNullOrEmpty(options.Options.URL)) throw new Exception("No URL provided");
        AzureOpenAIClient azureClient = new(
            new Uri(options.Options.URL),
            new ApiKeyCredential(apiStringKey));
        chatClient = azureClient.GetChatClient("gpt-4o-mini");
        return Task.CompletedTask;
    }

    public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        if (chatClient is null) return new AITranslationValueResult<List<string>>();

        var prompts = new List<ChatMessage>(text.Count());
        foreach (var item in text)
        {
            prompts.Add(new UserChatMessage(options.GetPrompt(item)));
        }

        var chatOptions = new ChatCompletionOptions
        {
            FrequencyPenalty = options.Options.FrequencyPenalty,
            MaxOutputTokenCount = options.Options.MaxTokens,
            Temperature = options.Options.Temperature,
            PresencePenalty = options.Options.PresencePenalty,
            TopP = options.Options.NucleusSamplingFactor,
            //AllowMultipleToolCalls = options.Options.Tools?.Count > 0, // options.Options.AllowMultipleToolCalls,
            //Seed = options.Options.Seed,
            //ResponseFormat = ChatResponseFormat.Text,
            //ToolMode = options.Options.ToolMode,
            //Tools = options.Options.Tools,
        };

        var result = await chatClient.CompleteChatAsync(prompts, chatOptions);

        return new AITranslationValueResult<List<string>>
        {
            Value = result.Value.Content.Select(x => x.Text).ToList(),
            AIResult = new AITranslationResult
            {
                TokensUsed = result.Value.Usage.TotalTokenCount,
                ModelUsed = result.Value.Model,
                InputTokens = result.Value.Usage.InputTokenCount,
                OutputTokens = result.Value.Usage.OutputTokenCount,
                //ExtraMessage = "placeholder"
            }

        };
    }
}

