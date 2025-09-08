using Jumoo.TranslationManager.AI.Models;
using Microsoft.Extensions.AI;

using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement
{
    [Weight(100)]
    public class OpenAITranslator : IAITranslator
    {
        public string Alias => "OpenAiTranslator";

        public string Name => "OpenAI Translator";
        public IChatClient? client;

        public Task Initialize(AITranslatorRequestOptions options)
        {
            var model = string.IsNullOrWhiteSpace(options.Options.Model) ? AIConstants.Defaults.Model : options.Options.Model;

            var apiStringKey = options.Options.GetAdditionalOption<string?>("openAiKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
                throw new Exception("No openai api key");

            client =
                new OpenAI.Chat.ChatClient(model, options.Options.GetAdditionalOption("openAiKey", string.Empty))
                .AsIChatClient();
            return Task.CompletedTask;
        }

        public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
        {
            if (client is null) return new AITranslationValueResult<List<string>>();

            var prompts = new List<ChatMessage>(text.Count());
            // for each text string in the text strings
            foreach (var item in text)
            {
                prompts.Add(new ChatMessage(ChatRole.User, options.GetPrompt(item)));
            }

            var chatOptions = new ChatOptions
            {
                FrequencyPenalty = options.Options.FrequencyPenalty,
                MaxOutputTokens = options.Options.MaxTokens,
                Temperature = options.Options.Temperature,
                PresencePenalty = options.Options.PresencePenalty,
                TopP = options.Options.NucleusSamplingFactor,
                AdditionalProperties = new AdditionalPropertiesDictionary(options.Options.Additional),
                TopK = options.Options.TopK,
                //AllowMultipleToolCalls = options.Options.Tools?.Count > 0, // options.Options.AllowMultipleToolCalls,
                ConversationId = options.Options.ConversationId,
                Instructions = options.Options.Instructions,
                Seed = options.Options.Seed,
                //ResponseFormat = ChatResponseFormat.Text,
                StopSequences = options.Options.StopSequences,
                //ToolMode = options.Options.ToolMode,
                //Tools = options.Options.Tools,
            };

            //Perry the Platypus, behold the AI TRANSLATINATOR, WHICH WILL AI TRANSLATE EVERY STRING IN THE TRI-STATE AREA!
            var result = await client.GetResponseAsync(prompts, chatOptions);

            return new AITranslationValueResult<List<string>>
            {
                Value = result.Messages.Where(x => string.IsNullOrEmpty(x.Text) is false)
                    .Select(x => x.Text).ToList(),
                AIResult = new AITranslationResult
                {
                    TokensUsed = result.Usage?.TotalTokenCount ?? 0,
                    ModelUsed = result.ModelId ?? options.Options.Model,
                    InputTokens = result.Usage?.InputTokenCount ?? 0,
                    OutputTokens = result.Usage?.OutputTokenCount ?? 0,
                    //ExtraMessage = "placeholder"
                }
            };

        }

        public bool IsValid(AIOptions options)
        {
            var apiStringKey = options.GetAdditionalOption<string?>("openAiKey", null);
            return string.IsNullOrWhiteSpace(apiStringKey) is false;
        }
    }
}