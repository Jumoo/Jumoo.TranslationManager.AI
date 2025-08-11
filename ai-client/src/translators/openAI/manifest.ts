import { ManifestAITranslatorConfig } from "../types";

export const OpenAIConfig: ManifestAITranslatorConfig = {
  type: "jumoo-tm-ai-translator",
  alias: "OpenAiTranslator",
  name: "OpenAI Config",
  js: () => import("./config-element.js"),
  elementName: "jumoo-tm-ai-openai-config",
};

export const manifests = [OpenAIConfig];
