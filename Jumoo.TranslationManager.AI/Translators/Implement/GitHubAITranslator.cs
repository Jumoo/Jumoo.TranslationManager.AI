using Azure;
using Azure.AI.Inference;

using Jumoo.TranslationManager.AI.Models;

using Microsoft.Extensions.AI;
using Microsoft.Extensions.Logging;

using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators.Implement;

[Weight(2000)]
[RequiredAIAdditionalOption("githubKey")]
public class GitHubAITranslator : AITranslatorBase, IAITranslator
{
    public override string Alias => "GitHubAiTranslator";
    public string Name => "GitHub Inference model translator";

    private readonly ILogger<GitHubAITranslator> logger;

    public GitHubAITranslator(ILogger<GitHubAITranslator> logger)
    {
        this.logger = logger;
    }

    public Task Initialize(AITranslatorRequestOptions options)
    {

        var apiStringKey = options.Options.GetAdditionalOption<string?>("githubKey", null);
        if (string.IsNullOrWhiteSpace(apiStringKey))
            throw new Exception("No api key");


        AzureKeyCredential credential = new(apiStringKey);
        Uri modelEndpoint = new("https://models.inference.ai.azure.com");

        client = new ChatCompletionsClient(modelEndpoint, credential).AsIChatClient(options.Options.Model);
        return Task.CompletedTask;
    }

    public async Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        if (client == null) return new AITranslationValueResult<List<string>>();

        var prompts = GetBasePrompts(text, options);
        var chatOptions = GetBaseChatOptions(options);
        chatOptions.TopK = null;
        chatOptions.AllowMultipleToolCalls = null;
        chatOptions.ResponseFormat = null;
        chatOptions.ToolMode = null;
        chatOptions.Tools = null;

        return await GetBaseResponseAsync(prompts, chatOptions, options, options.Options.Model);
    }
}
