using Jumoo.Json;
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
                APIKey = await _configService.GetProviderSettingAsync(_alias, "apiKey", string.Empty),
                Translator = await _configService.GetProviderSettingAsync(_alias, "translator", string.Empty),
                Model = await _configService.GetProviderSettingAsync(_alias, "model", AIConstants.Defaults.Model),
                AsHtml = await _configService.GetProviderSettingAsync(_alias, "asHtml", true),
                Prompt = await _configService.GetProviderSettingAsync(_alias, "prompt", AIConstants.Defaults.Prompt),
                SystemPrompt = await _configService.GetProviderSettingAsync(_alias, "systemPrompt", AIConstants.Defaults.Prompt),
                Split = await _configService.GetProviderSettingAsync(_alias, "split", true),
                Throttle = await _configService.GetProviderSettingAsync(_alias, "throttle", AIConstants.Defaults.Throttle),
                UseTranslationMemory = await _configService.GetProviderSettingAsync(_alias, "useTranslationMemory", false),
                MaxTokens = await _configService.GetProviderSettingAsync(_alias, "maxTokens", AIConstants.Defaults.MaxTokens),
                Temperature = await _configService.GetProviderSettingAsync(_alias, "temperature", AIConstants.Defaults.Temperature),
                FrequencyPenalty = await _configService.GetProviderSettingAsync(_alias, "frequencyPenalty", AIConstants.Defaults.FrequencyPenalty),
                PresencePenalty = await _configService.GetProviderSettingAsync(_alias, "presencePenalty", AIConstants.Defaults.PresencePenalty),
                NucleusSamplingFactor = await _configService.GetProviderSettingAsync(_alias, "nucleusSamplingFactor", AIConstants.Defaults.NucleusSamplingFactor),
                //AdditionalProperties = _configService.GetProviderSetting(_alias, "additionalProperties"),
                AllowMultipleToolCalls = await _configService.GetProviderSettingAsync<bool?>(_alias, "allowMultipleToolCalls", null),
                ConversationId = await _configService.GetProviderSettingAsync(_alias, "conversationId", string.Empty),
                Instructions = await _configService.GetProviderSettingAsync(_alias, "instructions", string.Empty),
                Seed = await _configService.GetProviderSettingAsync<long?>(_alias, "seed", null),
                StopSequences = await _configService.GetProviderSettingAsync<IList<string>?>(_alias, "stopSequences", null),
                ToolMode = await _configService.GetProviderSettingAsync<ChatToolMode?>(_alias, "toolMode", null),
                Tools = await _configService.GetProviderSettingAsync<IList<AITool>?>(_alias, "tools", null),
                TopK = await _configService.GetProviderSettingAsync(_alias, "topK", 50),
                URL = await _configService.GetProviderSettingAsync(_alias, "url", string.Empty)
            };

            _options.Additional = await LoadAdditional();

            return _options;
        }




        private async Task<Dictionary<string, object?>> LoadAdditional()
        {
            try
            {
                var settings = await _configService.GetProviderSettingAsync(_alias, "additional", "");

                return settings.DeserializeJson<Dictionary<string, object?>>() ?? [];


                //var additionalSettings = new Dictionary<string, object?>();

                //foreach (var setting in settings)
                //{
                //    var split = setting.Split(new char[] { '=' });
                //    if (split.Length == 2)
                //    {
                //        additionalSettings[split[0].ToLower()] = split[1];
                //    }
                //}

                //return additionalSettings;
            }
            catch // (Exception ex)
            {
                // _logger.LogWarning("Failed to read mappings check they are in the right format: {0}", ex.Message);
            }

            return [];
        }
    }
}
