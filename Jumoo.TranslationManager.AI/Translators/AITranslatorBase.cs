using Jumoo.TranslationManager.AI.Models;

using Microsoft.Extensions.AI;

namespace Jumoo.TranslationManager.AI.Translators;

public abstract class AITranslatorBase
{
    public abstract string Alias { get; }

    protected string[] _additionalProperties = [];
    protected string[] _properties = [];

    protected IChatClient? client;

    public AITranslatorBase()
    {
        var attributes = this.GetType().GetCustomAttributes(typeof(RequiredAIAdditionalOptionAttribute), true);
        _additionalProperties = attributes
            .OfType<RequiredAIAdditionalOptionAttribute>()
            .Select(x => x.PropertyName)
            .ToArray();

        var propAttributes = this.GetType().GetCustomAttributes(typeof(RequiredAIOptionsAttribute), true);
        _properties = propAttributes
            .OfType<RequiredAIOptionsAttribute>()
            .SelectMany(x => x.PropertyNames)
            .ToArray();
    }


    protected List<ChatMessage> GetBasePrompts(IEnumerable<string> text, AITranslatorRequestOptions options)
    {
        var prompts = new List<ChatMessage>(text.Count());

        var systemPrompt = options.GetSystemPrompt();
        if (string.IsNullOrWhiteSpace(systemPrompt) is false)
            prompts.Add(new ChatMessage(ChatRole.System, options.GetSystemPrompt()));

        prompts.AddRange(
            text.Select(x => new ChatMessage(ChatRole.User, options.GetPrompt(x))));

        return prompts;
    }

    protected ChatOptions GetBaseChatOptions(AITranslatorRequestOptions options)
    {
        return new ChatOptions
        {
            FrequencyPenalty = options.Options.FrequencyPenalty,
            MaxOutputTokens = options.Options.MaxTokens,
            Temperature = options.Options.Temperature,
            PresencePenalty = options.Options.PresencePenalty,
            TopP = options.Options.NucleusSamplingFactor,
            AdditionalProperties = new AdditionalPropertiesDictionary(options.Options.Additional),
            TopK = options.Options.TopK,
            AllowMultipleToolCalls = options.Options.Tools?.Count > 0, // options.Options.AllowMultipleToolCalls,
            ConversationId = options.Options.ConversationId,
            Instructions = options.Options.Instructions,
            Seed = options.Options.Seed,
            ResponseFormat = ChatResponseFormat.Text,
            StopSequences = options.Options.StopSequences,
            ToolMode = options.Options.ToolMode,
            Tools = options.Options.Tools,
        };
    }

    protected async Task<AITranslationValueResult<List<string>>> GetBaseResponseAsync(List<ChatMessage> prompts, 
        ChatOptions chatOptions, AITranslatorRequestOptions options)
    {
        if (client is null) return new AITranslationValueResult<List<string>>();

        var result = await client.GetResponseAsync(prompts, chatOptions);

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

    public virtual bool IsValid(AIOptions options)
    {
        foreach(var prop in _additionalProperties)
        {
            if (string.IsNullOrWhiteSpace(options.GetAdditionalOption<string?>(prop, null)))
                return false;
        }

        foreach(var prop in _properties)
        {
            var propertyInfo = typeof(AIOptions).GetProperty(prop);
            if (propertyInfo == null) return false;
            var value = propertyInfo.GetValue(options);
            if (value == null) return false;
            if (propertyInfo.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(value as string))
                return false;
        }

        return true;
    }
        

}

