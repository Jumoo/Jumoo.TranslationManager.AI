import { ManifestAITranslatorConfig } from "../types";

export const AzureConfig: ManifestAITranslatorConfig = {
  type: "jumoo-tm-ai-translator",
  alias: "OllamaTranslator",
  name: "Ollama AI Config",
  js: () => import("./config-element.js"),
  elementName: "jumoo-tm-ai-ollama-config",
};

export const manifests = [AzureConfig];
