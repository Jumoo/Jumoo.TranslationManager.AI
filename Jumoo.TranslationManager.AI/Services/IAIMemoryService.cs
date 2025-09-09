
namespace Jumoo.TranslationManager.AI.Services;

public interface IAIMemoryService
{
    Task AddTranslationMemory(List<string> source, List<string> values, string sourceLang, string targetLang, string reference, string translatorName);
    Task<Dictionary<int, string>> GetTranslatedMemoryValues(List<string> values, string source, string target, string translatorName);
    List<string> MergeTranslationMemory(List<string> translated, Dictionary<int, string> memory);
}