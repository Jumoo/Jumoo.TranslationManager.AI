import { ManifestTranslationConnector } from "@jumoo/translate";

export const connector: ManifestTranslationConnector = {
  type: "jumoo-tm-connector",
  alias: "jumoo-tm-ai-connector",
  name: "Ai Connector",
  meta: {
    icon: "jumoo-tm-ai-logo",
    label: "Ai connector",
    alias: "aiConnector",
  },
};
