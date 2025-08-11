import { ManifestAITranslatorConfig } from "../types";

export const GitHubConfig: ManifestAITranslatorConfig = {
  type: "jumoo-tm-ai-translator",
  alias: "GitHubAiTranslator",
  name: "GitHub Config",
  js: () => import("./config-element.js"),
  elementName: "jumoo-tm-ai-github-config",
};

export const manifests = [GitHubConfig];
