import { T as a } from "./types-DRKcGDAS.js";
import { html as l, css as u, customElement as m } from "@umbraco-cms/backoffice/external/lit";
var c = Object.defineProperty, f = Object.getOwnPropertyDescriptor, y = (t, i, o, r) => {
  for (var e = r > 1 ? void 0 : r ? f(i, o) : i, p = t.length - 1, s; p >= 0; p--)
    (s = t[p]) && (e = (r ? s(i, o, e) : s(e)) || e);
  return r && e && c(i, o, e), e;
};
let n = class extends a {
  render() {
    return l`${this.renderApiKey()}`;
  }
  renderApiKey() {
    var t;
    return l` <umb-property-layout
      .label=${this.localize.term("ai_openAIApiKey")}
      .description=${this.localize.term("ai_openAIApiKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="apiKey"
          label="ApiKey"
          .value=${((t = this.settings) == null ? void 0 : t.apiKey) ?? ""}
          @change=${this.onUpdateOption}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }
};
n.styles = u`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
n = y([
  m("jumoo-tm-ai-openai-config")
], n);
const h = n;
export {
  n as OpenAITranslatorConfigElement,
  h as default
};
//# sourceMappingURL=config-element-CrwbhvTY.js.map
