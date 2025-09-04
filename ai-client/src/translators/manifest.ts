import { manifests as OpenAIConfig } from "./openAI/manifest.js";
import { manifests as GitHubConfig } from "./github/manifest.js";
import { manifests as AzureConfig } from "./AzureOpenAI/manifest.js";
import { manifests as OllamaConfig } from "./ollama/manifest.js";

export const manifests = [
  ...OpenAIConfig,
  ...GitHubConfig,
  ...AzureConfig,
  ...OllamaConfig,
];
