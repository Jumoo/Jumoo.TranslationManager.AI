using Anthropic.SDK;
using Anthropic.SDK.Constants;
using Jumoo.TranslationManager.AI.Models;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

[Weight(100)]
[RequiredAIAdditionalOption("claudeAiKey")]
[RequiredAIAdditionalOption("claudeAiModel")]
internal class ClaudeAITranslator : AITranslatorBase, IAITranslator
{
    public ClaudeAITranslator(ILogger<AITranslatorBase> logger) : base(logger)
    {
    }

    public override string Alias => "ClaudeAiTranslator";
    public string Name => "Claude AI Translator";

    public Task Initialize(AITranslatorRequestOptions options)
    {
        var model = options.Options.GetAdditionalOption<string?>("claudeAiModel", null);
        if (string.IsNullOrEmpty(model)) throw new Exception("No model provided");

        var apiStringKey = options.Options.GetAdditionalOption<string?>("claudeAiKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
            throw new Exception("No Claude api key");

        client =
            new AnthropicClient(new APIAuthentication(apiStringKey)).Messages
    .AsBuilder()
    .UseFunctionInvocation()
    .Build();

        return Task.CompletedTask;
    }

    public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        if (client is null) return new AITranslationValueResult<List<string>>();

        var model = options.Options.GetAdditionalOption<string?>("claudeAiModel", null);
        if (string.IsNullOrEmpty(model)) throw new Exception("No model provided");

        var prompts = GetBasePrompts(text, options);

        var chatOptions = GetBaseChatOptions(options);
        chatOptions.ModelId = model;
        chatOptions.AllowMultipleToolCalls = null;
        chatOptions.ResponseFormat = null;
        chatOptions.Tools = null;
        chatOptions.ToolMode = null;
        chatOptions.Instructions = null;

        return await GetBaseResponseAsync(prompts, chatOptions, options, options.Options.GetAdditionalOption("claudeAiModel", string.Empty));
    }
}

