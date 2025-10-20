using Microsoft.Extensions.Logging;

namespace Jumoo.TranslationManager.AI.Services;


using Jumoo.TranslationManager.Core.Memory;

public class AIMemoryService : IAIMemoryService
{
    private readonly ILogger<AIMemoryService> _logger;
    private readonly TranslationMemoryService _memoryService;

    public AIMemoryService(TranslationMemoryService memoryService, ILogger<AIMemoryService> logger)
    {
        _memoryService = memoryService;
        _logger = logger;
    }

    /// <summary>
    ///  gets the list of values from the translation memory
    /// </summary>
    /// <remarks>
    ///  returns a dictionary of index and value, where the index is the list, so we can add it back in.
    /// </remarks>
    public async Task<Dictionary<int, string>> GetTranslatedMemoryValues(List<string> values, string source, string target, string translatorName)
    {
        var translated = new Dictionary<int, string>();

        for (int n = 0; n < values.Count; n++)
        {
            var value = values[n];
            var memory = await _memoryService.GetMemoriesAsync(source, target, value, translatorName);
            if (memory.Any())
            {
                _logger.LogDebug("Found memory for {value} at index {index}", value, n);
                translated.Add(n, memory.First().Translation);
            }
        }

        return translated;
    }

    public async Task AddTranslationMemory(List<string> source, List<string> values, string sourceLang, string targetLang, string reference, string translatorName)
    {
        await _memoryService.AddMemories(sourceLang, targetLang, source, values, translatorName, reference, false);
    }

    public List<string> MergeTranslationMemory(List<string> translated, Dictionary<int, string> memory)
    {
        if (memory.Count == 0)
        {
            _logger.LogDebug("No memory values to merge, returning translated values");
            return translated;
        }

        var total = translated.Count + memory.Count;
        var merged = new List<string>(translated.Count + memory.Count);
        int next = 0;
        for (int index = 0; index < total; index++)
        {
            if (memory.TryGetValue(index, out var memValue))
            {
                _logger.LogDebug("Using memory value for index {index}: {value}", index, memValue);
                merged.Add(memValue);
            }
            else
            {
                if (next < translated.Count)
                {
                    merged.Add(translated[next]);
                    next++;
                }
                else
                {
                    _logger.LogWarning("No memory value for index {index}, but no text to add", index);
                }
            }
        }
        return merged;
    }
}
