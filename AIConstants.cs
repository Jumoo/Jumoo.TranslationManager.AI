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
            public const int Throttle = 250;
            public const string Model = "gpt-4o-mini";
            public const string Prompt = "You will be provided with sentences in {sourceLang}, and your task is to translate it into {targetLang}. If you cannot translate something, leave it as it is. Translate all the text below: \n\r{text}";
            public const int MaxTokens = 500;
            public const int Temperature = 1;
            public const int FrequencyPenalty = 0;
            public const int PresencePenalty = 0;
            public const int NucleusSamplingFactor = 1;
        }
    }
}
