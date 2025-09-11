using GeminiDotnet;
using GeminiDotnet.Extensions.AI;

using Jumoo.TranslationManager.AI.Models;

using Microsoft.Extensions.AI;

using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

[RequiredAIAdditionalOption("geminiKey")]
[RequiredAIAdditionalOption("geminiModel")]
[Weight(250)]
public class GeminiTranslator : AITranslatorBase, IAITranslator
{
    public override string Alias => "GeminiTranslator";
    public string Name => "Gemini Translator";

    public Task Initialize(AITranslatorRequestOptions options)
    {
        var model = options.Options.GetAdditionalOption<string?>("geminiModel", null);
        if (string.IsNullOrEmpty(model)) throw new Exception("No model provided");

        var apiStringKey = options.Options.GetAdditionalOption<string?>("geminiKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
            throw new Exception("No gemini api key");

        var geminiOptions = new GeminiClientOptions { ApiKey = apiStringKey, ModelId = model };

        client = new GeminiChatClient(geminiOptions);
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

        var chatOptions = GetBaseChatOptions(options);
        chatOptions.ResponseFormat = null;
        chatOptions.AllowMultipleToolCalls = null;
        chatOptions.Tools = null;
        chatOptions.ToolMode = null;

        return await GetBaseResponseAsync(prompts, chatOptions, options, options.Options.Model);
    }
}