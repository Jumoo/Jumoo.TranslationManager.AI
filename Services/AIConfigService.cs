using Jumoo.TranslationManager.Core.Configuration;
using Microsoft.Extensions.AI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Extensions;

namespace Jumoo.TranslationManager.AI.Services
{
    public class AIConfigService
    {
        private readonly TranslationConfigService _configService;
        private AIOptions _options;

        private readonly string _alias = AIConnector.ConnectorAlias;

        public AIConfigService(TranslationConfigService configService)
        {
            _configService = configService;
        }

        public AIOptions LoadOptions()
        {
            _options = new AIOptions
            {
                APIKey = _configService.GetProviderSetting(_alias, "apiKey", string.Empty),
                Translator = _configService.GetProviderSetting(_alias, "translator", string.Empty),
                Model = _configService.GetProviderSetting(_alias, "model", AIConstants.Defaults.Model),
                AsHtml = _configService.GetProviderSetting(_alias, "asHtml", true),
                Prompt = _configService.GetProviderSetting(_alias, "prompt", AIConstants.Defaults.Prompt),
                SystemPrompt = _configService.GetProviderSetting(_alias, "systemPrompt", AIConstants.Defaults.Prompt),
                Split = _configService.GetProviderSetting(_alias, "split", true),
                Throttle = _configService.GetProviderSetting(_alias, "throttle", AIConstants.Defaults.Throttle),
                UseTranslationMemory = _configService.GetProviderSetting(_alias, "useTranslationMemory", false),
                MaxTokens = _configService.GetProviderSetting(_alias, "maxTokens", AIConstants.Defaults.MaxTokens),
                Temperature = _configService.GetProviderSetting(_alias, "temperature", AIConstants.Defaults.Temperature),
                FrequencyPenalty = _configService.GetProviderSetting(_alias, "frequencyPenalty", AIConstants.Defaults.FrequencyPenalty),
                PresencePenalty = _configService.GetProviderSetting(_alias, "presencePenalty", AIConstants.Defaults.PresencePenalty),
                NucleusSamplingFactor = _configService.GetProviderSetting(_alias, "nucleusSamplingFactor", AIConstants.Defaults.NucleusSamplingFactor),
                //AdditionalProperties = _configService.GetProviderSetting(_alias, "additionalProperties"),
                AllowMultipleToolCalls = _configService.GetProviderSetting<bool?>(_alias, "allowMultipleToolCalls", null),
                ConversationId = _configService.GetProviderSetting(_alias, "conversationId", string.Empty),
                Instructions = _configService.GetProviderSetting(_alias, "instructions", string.Empty),
                Seed = _configService.GetProviderSetting<long?>(_alias, "seed", null),
                StopSequences = _configService.GetProviderSetting<IList<string>?>(_alias, "stopSequences", null),
                ToolMode = _configService.GetProviderSetting<ChatToolMode?>(_alias, "toolMode", null),
                Tools = _configService.GetProviderSetting<IList<AITool>?>(_alias, "tools", null),
                TopK = _configService.GetProviderSetting(_alias, "topK", 50),
            };

            return _options;
        }
        private Dictionary<string, string> LoadMappings()
        {
            try
            {
                var mappings = _configService.GetProviderSetting(_alias, "mappedCultures", "")
                    .ToDelimitedList();

                var lanugageMappings = new Dictionary<string, string>();

                foreach (var mapping in mappings)
                {
                    var split = mapping.Split(new char[] { '=' });
                    if (split.Length == 2)
                    {
                        lanugageMappings[split[0].ToLower()] = split[1];
                    }
                }

                return lanugageMappings;
            }
            catch // (Exception ex)
            {
                // _logger.LogWarning("Failed to read mappings check they are in the right format: {0}", ex.Message);
            }

            return new Dictionary<string, string>();
        }
    }
}
