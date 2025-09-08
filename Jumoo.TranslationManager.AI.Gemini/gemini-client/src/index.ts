import { UmbEntryPointOnInit } from "@umbraco-cms/backoffice/extension-api";
import { manifests as configManifest } from "./gemini/manifest.js";
import { manifests as localizations } from "./lang/manifest.js";

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
  extensionRegistry.registerMany([...configManifest, ...localizations]);
};
