import {
  ManifestTranslationConnectorConfig,
  ManifestTranslationConnectorJob,
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

const connectorSubmitted: ManifestTranslationConnectorJob = {
  type: "jumoo-tm-connector-job",
  alias: "jumoo-ai-submitted",
  name: "AI Connector Submitted",
  elementName: "jumoo-ai-submitted",
  js: () => import("./submitted.view.js"),
};

export const manifests = [
  connectorConfig,
  connectorPending,
  connectorSubmitted,
];
