using Jumoo.TranslationManager.AI.Translators.Implement;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jumoo.TranslationManager.AI
{
    internal class AIConstants
    {
        public class Defaults
        {
            public const string Translator = "OpenAiTranslator";
            public const int Throttle = 250;
            public const bool Split = true;
            public const bool AsHtml = true;
            public const string Model = "gpt-4o-mini";
            public const string Prompt = "You will be provided with sentences in {sourceLang}, and your task is to translate it into {targetLang}. If you cannot translate something, leave it as it is. Translate all the text below: \n\r{text}";
            public const int MaxTokens = 500;
            public const int Temperature = 1;
            public const int FrequencyPenalty = 0;
            public const int PresencePenalty = 0;
            public const int NucleusSamplingFactor = 1;
        }

        public class Connector
        {
            public const string Name = "AI Connector";
            public const string Alias = "AIConnector";
            public const string Version = "16.0.0";

#if UMB_16_OR_GREATER
            public const string PluginPath = "/App_Plugins/Translations.AI/modern/";
#else
            public const string PluginPath = "/App_Plugins/Translations.AI/legacy/";
#endif
        }

        public class Views
        {
#if UMB_16_OR_GREATER
            public const string Config = "jumoo-ai-config";
            public const string Pending = "jumoo-ai-pending";
            public const string Submitted = "jumoo-ai-submitted";
            public const string Approved = "jumoo-ai-submitted";
#else
            public const string Config = AIConstants.Connector.PluginPath + "config.html";
            public const string Pending = AIConstants.Connector.PluginPath + "pending.html";
            public const string Submitted = AIConstants.Connector.PluginPath + "submitted.html";
            public const string Approved = AIConstants.Connector.PluginPath + "submitted.html";
#endif
        }
    }
}
