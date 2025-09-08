import { ManifestAITranslatorConfig } from "../types";

export const AzureConfig: ManifestAITranslatorConfig = {
  type: "jumoo-tm-ai-translator",
  alias: "AzureOpenAiTranslator",
  name: "Azure OpenAI Config",
  js: () => import("./config-element.js"),
  elementName: "jumoo-tm-ai-azure-config",
};

export const manifests = [AzureConfig];
