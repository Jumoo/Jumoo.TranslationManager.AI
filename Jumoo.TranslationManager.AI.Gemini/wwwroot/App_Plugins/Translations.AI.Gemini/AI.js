const o = {
  type: "jumoo-tm-ai-translator",
  alias: "GeminiTranslator",
  name: "Gemini Config",
  js: () => import("./config-element-DEF_WOqg.js"),
  elementName: "jumoo-tm-ai-gemini-config"
}, n = [o], t = {
  type: "localization",
  alias: "jumoo.ai.gemini.localization",
  name: "AI Localization",
  js: () => import("./en-Civ5glqL.js"),
  meta: {
    culture: "en"
  }
}, a = [t], m = (e, i) => {
  i.registerMany([...n, ...a]);
};
export {
  m as onInit
};
//# sourceMappingURL=AI.js.map
