using HtmlAgilityPack;

using Jumoo.TranslationManager.AI.Models;
using Jumoo.TranslationManager.AI.Translators;
using Jumoo.TranslationManager.Core;
using Jumoo.TranslationManager.Core.Models;

using Microsoft.Extensions.Logging;

using System.Text;

namespace Jumoo.TranslationManager.AI.Services
{
    public class AITranslationService
    {
        private readonly AIMemoryService _memoryService;
        private readonly AIMessageService _messageService;

        private readonly ILogger<AITranslationService> _logger;
        private readonly AITranslatorCollection _translators;

        public AITranslationService(
            ILogger<AITranslationService> logger,
            AITranslatorCollection translators,
            AIMemoryService memoryService,
            AIMessageService messageService)
        {
            _logger = logger;
            _translators = translators;
            _memoryService = memoryService;
            _messageService = messageService;
        }

        public bool IsTranslatorValid(string translatorAlias, AIOptions options)
        {
            var translator = _translators.GetTranslator(translatorAlias);
            if (!translator?.IsValid(options) ?? true) return false;

            return true;
        }

        public async Task<AITranslationResult> TranslateNodeAsync(TranslationNode node, string sourceLang, string targetLang, AIOptions options)
        {
            _logger.LogDebug("Translating: {nodeId}", node.MasterNodeId);

            var translator = _translators.GetTranslator(options.Translator) ??
                throw new KeyNotFoundException($"Can't find translator of {options.Translator}");

            var request = new AITranslatorRequest
            {
                Translator = translator,
                RequestOptions = new AITranslatorRequestOptions
                {
                    Options = options,
                    SourceLanguage = sourceLang,
                    TargetLanguage = targetLang
                }
            };

            await translator.Initialize(request.RequestOptions);

            var aiResult = new AITranslationResult();

            var count = 0;
            var total = node.Groups.Sum(g => g.Properties.Count);

            foreach (var group in node.Groups)
            {
                foreach (var property in group.Properties)
                {
                    _logger.LogDebug("Translation: {nodeId} {group} {property}",
                        node.MasterNodeId, group, property);

                    await _messageService.SendUpdateAsync(
                        "Translating",
                        $"Translating {property.Source?.Path ?? ""} for {node.MasterNodeName} ({node.Id})",
                        (int)((count / (double)total) * 100),
                        string.Empty
                    );

                    if (property.Source == null || property.Target == null) continue;

                    request.RequestOptions.Reference = node.Key.ToString();

                    var result = await GetTranslatedValue(
                        property.Source, property.Target, request);
                    if (result == null)
                        throw new Exception("Failed to translate.");

                    property.Target = result.Value;
                    aiResult.AppendResult(result.AIResult);
                }

                if (options.Throttle > 0)
                {
                    _logger.LogDebug("Throttle: Waiting... {0}ms", options.Throttle);
                    await Task.Delay(options.Throttle);
                }
            }
            return aiResult;
        }
        private async Task<AITranslationValueResult<TranslationValue>> GetTranslatedValue(TranslationValue source, TranslationValue target, AITranslatorRequest request)
        {
            _logger.LogDebug("GetTranslationValue: {name}", source.DisplayName);

            var aiResult = new AITranslationValueResult<TranslationValue>
            {
                Value = target,
                AIResult = new AITranslationResult()
            };

            if (source.HasChildValues())
            {
                foreach (var innerValue in source.InnerValues)
                {
                    _logger.LogDebug("GetTranslatedValue: Child : {key}", innerValue.Key);

                    var innerTarget = target.GetInnerValue(innerValue.Key);
                    if (innerTarget == null)
                    {
                        _logger.LogWarning("No inner target to match child (bad setup)");
                        continue;
                    }

                    var translatedValue = await GetTranslatedValue(innerValue.Value, innerTarget, request);
                    if (translatedValue != null)
                    {
                        aiResult.AIResult.AppendResult(translatedValue.AIResult);
                        innerTarget = translatedValue.Value;
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(source.Value))
            {
                _logger.LogDebug("Translating: [{value}] [{source} to {target}]",
                    source.Value, request.RequestOptions.SourceLanguage, request.RequestOptions.TargetLanguage);

                // has a value to translate 
                if (request.RequestOptions.Options.Split)
                {
                    _logger.LogDebug("Splitting");

                    var result = await TranslateHtmlValue(source.Value, request);
                    // if it's html, we split it up. 
                    aiResult.AppendResult(result, true);
                }
                else
                {
                    _logger.LogDebug("Not splitting, treating as single string");
                    aiResult.AppendResult(await TranslateStringValue(source.Value, request), true);
                }
            }

            return aiResult;
        }

        /// <summary>
        ///  translate the text as if it's html, 
        ///  We split by top level node (so hopefully paragraphs)
        ///  and return that 
        /// </summary>
        private async Task<AITranslationValueResult<string>> TranslateHtmlValue(string source, AITranslatorRequest request)
        {
            if (!IsHtml(source) || source.Length <= _splitLength)
                return await TranslateStringValue(source, request);

            var doc = new HtmlDocument();
            doc.LoadHtml(source);

            return await TranslateHtmlNodes(doc.DocumentNode.ChildNodes, request);
        }

        private static int _splitLength = 10000;

        private async Task<AITranslationValueResult<string>> TranslateHtmlNodes(HtmlNodeCollection nodes, AITranslatorRequest request)
        {
            _logger.LogDebug("Treating as Html");

            var result = new AITranslationValueResult<string>
            {
                Value = string.Empty,
                AIResult = new AITranslationResult()
            };

            List<string> values = new List<string>();

            foreach (var node in nodes)
            {
                var value = node.OuterHtml;
                if (!string.IsNullOrWhiteSpace(value))
                {
                    if (value.Length > _splitLength)
                    {
                        if (node.HasChildNodes)
                        {
                            // if we get here then the bulk values up and send process won't work.
                            // (because we need to know that the translations are wrapped in a html tag
                            // we haven't sent to translation)

                            // we have to send what we have already done to translation, 
                            var stringResult = await TranslateStringValues(values, request);
                            result.AppendResult(stringResult);

                            // and then send this block to translation
                            result.AppendResult(await TranslateHtmlNodes(node.ChildNodes, request));

                            // and then resume adding things to a now empty list, 
                            values.Clear();
                        }
                        else
                        {
                            _logger.LogWarning("Splitting single html element that spans more than 10000 charecters. " +
                                "This is larger than the request limit, splitting may result in some issues with translation.");

                            // we attempt to split the tag, we also wrap it in the nodeName, to make it fit
                            var innerValue = node.InnerHtml;

                            // take the tag name and the braces (< > < / > ) from the 10000 budget. 
                            var size = _splitLength - 5 - (node.Name.Length * 2);
                            values.AddRange(Split(innerValue, size, node.Name));
                        }
                    }
                    else
                    {
                        values.Add(value);
                    }
                }
            }

            if (values.Count > 0)
            {
                result.AppendResult(await TranslateStringValues(values, request));
            }

            return result;
        }

        /// <summary>
        ///  translates a string using the api, we assume the string isn't anything
        ///  fancy, and if it's super long, we just hard split it at 10000 chars
        /// </summary>
        private async Task<AITranslationValueResult<string>> TranslateStringValue(string source, AITranslatorRequest request)
        {
            var values = Split(source, _splitLength);
            return await TranslateStringValues(values, request);
        }

        /// <summary>
        ///  bit that calls the API to do the translation.
        /// </summary>
        private async Task<AITranslationValueResult<string>> TranslateStringValues(IEnumerable<string> values, AITranslatorRequest request)
        {
            var aiResult = new AITranslationResult();

            _logger.LogDebug("Translating: {count} values", values.Count());

            var valueList = values.ToList(); ;

            var translatedText = new StringBuilder();

            _logger.LogDebug("Splitting: {count} values", valueList.Count);
            int end = 0;
            while (end < valueList.Count)
            {
                var block = GetBlocks(valueList, end, out end).ToList();

                if (block.Count > 0)
                {
                    _logger.LogDebug("Blocks : {count}, {end}", block.Count, end);
                    _logger.LogDebug("Translating: {count} as one chunk", block.Count);
                    _logger.LogDebug("Chunks: {blocks}", string.Join("\r\n", block));

                    foreach (var b in block)
                    {
                        _logger.LogDebug("Chunk {length}", b.Length);
                    }

                    var toTranslate = block;
                    var memory = new Dictionary<int, string>();

                    if (request.RequestOptions.Options.UseTranslationMemory is true)
                    {

                        memory = await _memoryService.GetTranslatedMemoryValues(block, request.RequestOptions.SourceLanguage, request.RequestOptions.TargetLanguage, request.Translator.Alias);
                        foreach (var key in memory.Keys.OrderDescending())
                        {
                            toTranslate.RemoveAt(key);
                        }
                    }

                    _logger.LogDebug("Memory: {memory} values - remaining {pending}", memory.Count, toTranslate.Count);

                    List<string> text = [];
                    if (toTranslate.Count > 0)
                    {
                        ///////
                        var response = await request.Translator.TranslateText(block, request.RequestOptions);
                        ///////

                        if (response.Value != null)
                        {
                            aiResult.AppendResult(response.AIResult);

                            text = [.. response.Value];

                            _logger.LogDebug("Returned: {count} translated values", text.Count);

                            // add the translated values to memory
                            if (request.RequestOptions.Options.UseTranslationMemory is true)
                                await _memoryService.AddTranslationMemory(toTranslate, text, request.RequestOptions.SourceLanguage, request.RequestOptions.TargetLanguage, request.RequestOptions.Reference, request.Translator.Alias);
                        }
                    }

                    // merge the memory values back in
                    var merged = _memoryService.MergeTranslationMemory(text, memory);

                    translatedText.Append(string.Join("", merged));
                }
                else
                {
                    _logger.LogDebug("Empty Block");
                    break;
                }
            }

            _logger.LogDebug("Translated: {translated}", translatedText.ToString());

            return new AITranslationValueResult<string>
            {
                Value = translatedText.ToString().Trim(),
                AIResult = aiResult
            };
        }

        private List<string> GetBlocks(IList<string> values, int start, out int end)
        {
            int pos = start;
            var block = new List<string>();
            var length = 0;
            while (pos < values.Count && block.Count < 25)
            {
                length += values[pos].Length;
                if (length <= _splitLength)
                {
                    block.Add(values[pos]);
                }
                else
                {
                    break;
                }
                pos++;
            }

            end = pos;

            return block;
        }

        private IEnumerable<string> Split(string str, int maxChunkSize, string surroundingTag = "")
        {
            for (int i = 0; i < str.Length; i += maxChunkSize)
            {
                var chunk = str.Substring(i, Math.Min(maxChunkSize, str.Length - i));

                if (!string.IsNullOrWhiteSpace(surroundingTag))
                {
                    yield return $"<{surroundingTag}>{chunk}</{surroundingTag}>";
                }
                else
                {
                    yield return chunk;
                }
            }
        }

        private bool IsHtml(string text)
        {
            if (!string.IsNullOrWhiteSpace(text))
            {
                var doc = new HtmlDocument();
                doc.LoadHtml(text);
                return !doc.DocumentNode.ChildNodes.All(x => x.NodeType == HtmlNodeType.Text);
            }

            return false;
        }


    }
}
