import { ManifestAITranslatorConfig } from "../types";

export const ClaudeConfig: ManifestAITranslatorConfig = {
  type: "jumoo-tm-ai-translator",
  alias: "ClaudeAiTranslator",
  name: "Claude AI Config",
  js: () => import("./config-element.js"),
  elementName: "jumoo-tm-ai-claude-config",
};

export const manifests = [ClaudeConfig];
