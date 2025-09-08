import { TranslatorAIConfigElementBase as m } from "@jumoo/translate-ai";
import { html as s, css as u, customElement as p } from "@umbraco-cms/backoffice/external/lit";
var d = Object.getOwnPropertyDescriptor, c = (e, i, a, o) => {
  for (var t = o > 1 ? void 0 : o ? d(i, a) : i, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (t = l(t) || t);
  return t;
};
let r = class extends m {
  render() {
    return s`${this.renderApiKey()}`;
  }
  renderApiKey() {
    var e, i;
    return s` <umb-property-layout
      .label=${this.localize.term("gemini_apiKey")}
      .description=${this.localize.term("gemini_apiKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="geminiKey"
          label="ApiKey"
          .value=${((i = (e = this.settings) == null ? void 0 : e.additional) == null ? void 0 : i.geminiKey) ?? ""}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }
};
r.styles = u`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
r = c([
  p("jumoo-tm-ai-gemini-config")
], r);
const f = r;
export {
  r as GeminiTranslatorConfigElement,
  f as default
};
//# sourceMappingURL=config-element-DEF_WOqg.js.map
