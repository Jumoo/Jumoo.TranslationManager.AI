using Azure;
using Azure.AI.Inference;
using Jumoo.TranslationManager.AI.Models;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Logging;

namespace Jumoo.TranslationManager.AI.Translators.Implement
{
    public class GitHubAITranslator :IAITranslator
    {
        public string Alias => "GitHubAiTranslator";

        public string Name => "GitHub AI Translator";
        public IChatClient? client;
        private readonly ILogger<GitHubAITranslator> logger;

        public GitHubAITranslator(ILogger<GitHubAITranslator> logger)
        {
            this.logger = logger;
        }

        public Task Initialize(AITranslatorRequestOptions options)
        {
            AzureKeyCredential credential = new(options.Options.APIKey);
            Uri modelEndpoint = new("https://models.inference.ai.azure.com");

            client = new ChatCompletionsClient(modelEndpoint, credential).AsIChatClient(options.Options.Model);
            return Task.CompletedTask;
        }

        public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
        {
            if (client == null) return new AITranslationValueResult<List<string>>();

            var prompts = new List<ChatMessage>(text.Count());
            // for each text string in the text strings
            foreach (var item in text)
            {
                prompts.Add(new ChatMessage(Microsoft.Extensions.AI.ChatRole.User, options.GetPrompt(item)));
            }

            var chatOptions = new ChatOptions
            {
                FrequencyPenalty = options.Options.FrequencyPenalty,
                MaxOutputTokens = options.Options.MaxTokens,
                Temperature = options.Options.Temperature,
                PresencePenalty = options.Options.PresencePenalty,
                TopP = options.Options.NucleusSamplingFactor,
                AdditionalProperties = new AdditionalPropertiesDictionary(options.Options.AdditionalProperties),
               // TopK = options.Options.TopK,
                //AllowMultipleToolCalls = options.Options.Tools?.Count > 0, // options.Options.AllowMultipleToolCalls,
                ConversationId = options.Options.ConversationId,
                Instructions = options.Options.Instructions,
                Seed = options.Options.Seed,
                //ResponseFormat = ChatResponseFormat.Text,
                StopSequences = options.Options.StopSequences,
                //ToolMode = options.Options.ToolMode,
                //Tools = options.Options.Tools,
            };

            var result = await client.GetResponseAsync(prompts, chatOptions);

            logger.LogDebug("Result: {result}", result );

            return new AITranslationValueResult<List<string>>
            {
                Value = result.Messages.Where(x => string.IsNullOrEmpty(x.Text) is false)
                    .Select(x => x.Text).ToList(),
                AIResult = new AITranslationResult
                {
                    TokensUsed = result.Usage?.TotalTokenCount ?? 0,
                    ModelUsed = result.ModelId ?? options.Options.Model
                }
            };
        }
    }
}
