export default {
  ai: {
    intro:
      "Configure your AI Translation settings below. you will likely need an API key and other settings to use your chosen AI provider.",
    openAiKey: "OpenAI API Key",
    openAiKeyDescription: "AI Translation API Key for OpenAI",
    openAiModel: "OpenAI Model",
    openAiModelDescription: "OpenAI model to use for translation",
    githubModel: "Github Models AI Model",
    githubModelDescription: "Github Models AI model to use for translation",
    azureModel: "Azure AI Model",
    azureModelDescription: "Azure AI model to use for translation",
    githubKey: "GitHub Models Auth Key",
    githubKeyDescription: "AI Translation Auth Key for GitHub Models",
    azureKey: "Azure OpenAI API Key",
    azureKeyDescription: "AI Translation API Key for Azure OpenAI",
    azureUrl: "Azure Endpoint URL",
    azureUrlDescription:
      "Supported Azure OpenAI endpoints (protocol and hostname, for example: https://aoairesource.openai.azure.com. Replace 'aoairesource' with your Azure OpenAI resource name). https://{your-resource-name}.openai.azure.com",
    claudeAiKey: "Claude Api Key",
    claudeAiKeyDescription: "AI Translation API Key for Claude",
    claudeAiModel: "Claude AI Model",
    claudeAiModelDescription: "Claude AI model to use for translation",
    throttle: "Throttle",
    throttleDescription:
      "Number of milliseconds to wait between calls (To Avoid API Throttling)",
    split: "Split",
    splitDescription: "Split any HTML before sending to translation",
    sendAsHtml: "Send as HTML",
    sendAsHtmlDescription:
      "Make sure html elements are marked as html when sent to translation",
    library: "AI Library",
    libraryDescription:
      "Choose which API Library to use when sending translations",
    model: "Model",
    modelDescription:
      "AI model to use for translation, can be overwritten by translator-specific model setting",
    maxTokens: "Max Tokens",
    maxTokensDescription:
      "The maximum number of tokens to generate in the completion",
    temperature: "Temperature",
    temperatureDescription: "Sampling temperature",
    frequencyPenalty: "Frequency Penalty",
    frequencyPenaltyDescription:
      "Penalty for repeated tokens in chat responses proportional to how many times they've appeared", //whatever that means, idk I just work here
    presencePenalty: "Presence Penalty",
    presencePenaltyDescription:
      "Influences the probability of generated tokens appearing based on their existing presence in generated text", //whatever THAT means
    nucleusSampling: "Nucleus Sampling/TopP",
    nucleusSamplingDescription:
      "The 'nucleus sampling' factor (or 'top p') for generating chat responses",

    systemPrompt: "System Prompt",
    systemPromptDescription: "The system prompt sent to the AI model",

    prompt: "Prompt",
    promptDescription: "The prompt sent to the AI model for translation",
    toolCalls: "Allow Multiple Tool Calls",
    toolCallsDescription:
      "Whether a single response is allowed to include multiple tool calls",
    conversationId: "Conversation ID",
    conversationIdDescription:
      "An optional identifier used to associate a request with an existing conversation",
    instructions: "Instructions",
    instructionsDescription:
      "Additional per-request instructions to be provided to the IChatClient",
    topK: "TopK",
    topKDescription:
      "The number of most probable tokens that the model considers when generating the next part of the text",
    seed: "Seed",
    seedDescription:
      "Seed value used by a service to control the reproducibility of results",
    modelUsed: "Model Used:",
    tokensUsed: "Tokens Used:",
    translatorUsed: "Translator Used:",
    extra: "Extra Info:",
    translationMemory: "Use Translation Memory",
    translationMemoryDescription:
      "Writes and uses local translation memory during a job",

    ollamaUrl: "Ollama URL",
    ollamaUrlDescription: "The URL of your Ollama server",
    ollamaModel: "Ollama Model",
    ollamaModelDescription: "The model to use on your Ollama server",
  },
};
