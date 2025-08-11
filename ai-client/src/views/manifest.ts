import {
  ManifestTranslationConnectorConfig,
  ManifestTranslationConnectorPending,
} from "@jumoo/translate";

const connectorConfig: ManifestTranslationConnectorConfig = {
  type: "jumoo-tm-connector-config",
  alias: "jumoo-ai-config",
  name: "Ai Connector Config",
  elementName: "jumoo-ai-config",
  js: () => import("./config.view.js"),
};

const connectorPending: ManifestTranslationConnectorPending = {
  type: "jumoo-tm-connector-pending",
  alias: "jumoo-ai-pending",
  name: "Ai Connector Pending",
  elementName: "jumoo-ai-pending",
  js: () => import("./pending.view.js"),
};

export const manifests = [connectorConfig, connectorPending];
