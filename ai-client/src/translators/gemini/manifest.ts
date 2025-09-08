import { ManifestAITranslatorConfig } from "../types";

export const GeminiConfig: ManifestAITranslatorConfig = {
  type: "jumoo-tm-ai-translator",
  alias: "GeminiTranslator",
  name: "Gemini Config",
  js: () => import("./config-element.js"),
  elementName: "jumoo-tm-ai-gemini-config",
};

export const manifests = [GeminiConfig];
