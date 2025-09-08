const localization: UmbExtensionManifest = {
  type: "localization",
  alias: "jumoo.ai.gemini.localization",
  name: "AI Localization",
  js: () => import("./en.js"),
  meta: {
    culture: "en",
  },
};

export const manifests = [localization];
