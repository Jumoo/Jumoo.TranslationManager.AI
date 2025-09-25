using Jumoo.TranslationManager.AI.Models;
using Microsoft.Extensions.AI;
using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

[Weight(100)]
[RequiredAIAdditionalOption("openAiKey")]
[RequiredAIAdditionalOption("openAiModel")]
public class OpenAITranslator : AITranslatorBase, IAITranslator
{
    public override string Alias => "OpenAiTranslator";
    public string Name => "OpenAI Translator";

    public Task Initialize(AITranslatorRequestOptions options)
    {
        var model = options.Options.GetAdditionalOption<string?>("openAiModel", null);
        if (string.IsNullOrEmpty(model)) throw new Exception("No model provided");

        var apiStringKey = options.Options.GetAdditionalOption<string?>("openAiKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
            throw new Exception("No OpenAI api key");

        client =
            new OpenAI.Chat.ChatClient(model, apiStringKey)
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

        return await GetBaseResponseAsync(prompts, chatOptions, options, options.Options.GetAdditionalOption("openAiModel", string.Empty));
    }
}