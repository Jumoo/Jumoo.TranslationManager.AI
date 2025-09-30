using Jumoo.TranslationManager.AI.Models;

using Microsoft.Extensions.ObjectPool;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jumoo.TranslationManager.AI.Translators;

public interface IAITranslator
{
    string Alias { get; }
    string Name { get; }

    bool IsValid(AIOptions options);

    Task Initialize(AITranslatorRequestOptions options);

    Task<AITranslationValueResult<List<string>>> TranslateText(IEnumerable<string> text, AITranslatorRequestOptions options);
}

public class AITranslatorRequest
{
    public required IAITranslator Translator { get; set; }
    public required AITranslatorRequestOptions RequestOptions { get; set; }
}

public class AITranslatorRequestOptions
{
    public required string SourceLanguage { get; set; }
    public required string TargetLanguage { get; set; }
    public string Reference {  get; set; } = string.Empty;
    public required AIOptions Options { get; set; }

}

public static class AITranslatorRequestOptionsExtensions
{
    //public static string GetPrompt(this AITranslatorRequestOptions options,
    //   string text)
    //   => options.Options.Prompt.Replace("{sourceLang}", options.SourceLanguage)
    //       .Replace("{targetLang}", options.TargetLanguage)
    //       .Replace("{textType}", options.Options.AsHtml ? "html" : "text")
    //       .Replace("{text}", text);

    public static string GetSystemPrompt(this AITranslatorRequestOptions options)
        => options.Options.SystemPrompt.Replace("{sourceLang}", options.SourceLanguage)
            .Replace("{targetLang}", options.TargetLanguage)
            .Replace("{textType}", options.Options.AsHtml ? "html" : "text");

}