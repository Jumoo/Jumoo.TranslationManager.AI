const icons: UmbExtensionManifest = {
  type: "icons",
  alias: "jumoo.tm.icons.ai",
  name: "Translation Manager Ai Icon",
  js: () => import("./icons.js"),
};

export const manifests = [icons];
