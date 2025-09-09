using Jumoo.TranslationManager.AI.Models;
using Microsoft.Extensions.AI;

using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

[Weight(100)]
[RequiredAIAdditionalOption("openAiKey")]
[RequiredAIOptions(nameof(AIOptions.Model))]
public class OpenAITranslator : AITranslatorBase, IAITranslator
{
    public override string Alias => "OpenAiTranslator";
    public string Name => "OpenAI Translator";

    public Task Initialize(AITranslatorRequestOptions options)
    {
        var model = string.IsNullOrWhiteSpace(options.Options.Model) ? AIConstants.Defaults.Model : options.Options.Model;

        var apiStringKey = options.Options.GetAdditionalOption<string?>("openAiKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
            throw new Exception("No OpenAi api key");

        client =
            new OpenAI.Chat.ChatClient(model, options.Options.GetAdditionalOption("openAiKey", string.Empty))
            .AsIChatClient();
        
        return Task.CompletedTask;
    }

    public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        if (client is null) return new AITranslationValueResult<List<string>>();

        var prompts = GetBasePrompts(text, options);

        var chatOptions = GetBaseChatOptions(options);
        chatOptions.AllowMultipleToolCalls = null;
        chatOptions.ResponseFormat = null;
        chatOptions.Tools = null;
        chatOptions.ToolMode = null;

        return await GetBaseResponseAsync(prompts, chatOptions, options);
    }
}