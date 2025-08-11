export default {
  ai: {
    openAIApiKey: "OpenAI API Key",
    openAIApiKeyDescription: "AI Translation API Key for OpenAI",
    githubAuthKey: "GitHub Auth Key",
    githubAuthKeyDescription: "AI Translation Auth Key for GitHub",
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
    modelDescription: "AI model to use for translation",
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
    extra: "Extra Info:",
  },
};
