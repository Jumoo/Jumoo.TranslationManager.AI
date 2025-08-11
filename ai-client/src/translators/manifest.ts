import { manifests as OpenAIConfig } from "./openAI/manifest.js";
import { manifests as GitHubConfig } from "./github/manifest.js";

export const manifests = [...OpenAIConfig, ...GitHubConfig];
