using Jumoo.TranslationManager.AI.Extensions;
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
        private AIOptions? _options;

        private readonly string _alias = AIConnector.ConnectorAlias;

        public AIConfigService(TranslationConfigService configService)
        {
            _configService = configService;
        }

        public async Task<AIOptions> LoadOptions()
        {
            _options = new AIOptions
            {
                APIKey = await _configService.AIGetProviderSettingAsync(_alias, "apiKey", string.Empty),
                Translator = await _configService.AIGetProviderSettingAsync(_alias, "translator", string.Empty),
                Model = await _configService.AIGetProviderSettingAsync(_alias, "model", AIConstants.Defaults.Model),
                AsHtml = await _configService.AIGetProviderSettingAsync(_alias, "asHtml", true),
                //Prompt = await _configService.AIGetProviderSettingAsync(_alias, "prompt", AIConstants.Defaults.Prompt),
                SystemPrompt = await _configService.AIGetProviderSettingAsync(_alias, "systemPrompt", AIConstants.Defaults.SystemPrompt),
                Split = await _configService.AIGetProviderSettingAsync(_alias, "split", true),
                Throttle = await _configService.AIGetProviderSettingAsync(_alias, "throttle", AIConstants.Defaults.Throttle),
                UseTranslationMemory = await _configService.AIGetProviderSettingAsync(_alias, "useTranslationMemory", false),
                MaxTokens = await _configService.AIGetProviderSettingAsync(_alias, "maxTokens", AIConstants.Defaults.MaxTokens),
                Temperature = await _configService.AIGetProviderSettingAsync(_alias, "temperature", AIConstants.Defaults.Temperature),
                FrequencyPenalty = await _configService.AIGetProviderSettingAsync(_alias, "frequencyPenalty", AIConstants.Defaults.FrequencyPenalty),
                PresencePenalty = await _configService.AIGetProviderSettingAsync(_alias, "presencePenalty", AIConstants.Defaults.PresencePenalty),
                NucleusSamplingFactor = await _configService.AIGetProviderSettingAsync(_alias, "nucleusSamplingFactor", AIConstants.Defaults.NucleusSamplingFactor),
                //AdditionalProperties = _configService.GetProviderSetting(_alias, "additionalProperties"),
                AllowMultipleToolCalls = await _configService.AIGetProviderSettingAsync<bool?>(_alias, "allowMultipleToolCalls", null),
                ConversationId = await _configService.AIGetProviderSettingAsync(_alias, "conversationId", string.Empty),
                Instructions = await _configService.AIGetProviderSettingAsync(_alias, "instructions", string.Empty),
                Seed = await _configService.AIGetProviderSettingAsync<long?>(_alias, "seed", null),
                StopSequences = await _configService.AIGetProviderSettingAsync<IList<string>?>(_alias, "stopSequences", null),
                ToolMode = await _configService.AIGetProviderSettingAsync<ChatToolMode?>(_alias, "toolMode", null),
                Tools = await _configService.AIGetProviderSettingAsync<IList<AITool>?>(_alias, "tools", null),
                TopK = await _configService.AIGetProviderSettingAsync(_alias, "topK", 50),
                URL = await _configService.AIGetProviderSettingAsync(_alias, "url", string.Empty)
            };

            _options.Additional = await LoadAdditional();

            return _options;
        }




        private async Task<Dictionary<string, object?>> LoadAdditional()
        {
            try
            {
                object settings = await _configService.AIGetProviderSettingAsync(_alias, "additional", new Dictionary<string, object>());

                switch(settings)
                {
                    case Dictionary<string, object?> dict:
                        return dict;
                    case string str:
                        settings = str.AIDeserializeJson<Dictionary<string, object>>() ?? [];
                        break;
                    default:
                        return [];
                }
            }
            catch // (Exception ex)
            {
                // _logger.LogWarning("Failed to read mappings check they are in the right format: {0}", ex.Message);
            }

            return [];
        }
    }
}
