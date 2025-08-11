import { T as a } from "./types-DRKcGDAS.js";
import { html as l, css as p, customElement as m } from "@umbraco-cms/backoffice/external/lit";
var h = Object.defineProperty, c = Object.getOwnPropertyDescriptor, f = (t, i, s, r) => {
  for (var e = r > 1 ? void 0 : r ? c(i, s) : i, u = t.length - 1, n; u >= 0; u--)
    (n = t[u]) && (e = (r ? n(i, s, e) : n(e)) || e);
  return r && e && h(i, s, e), e;
};
let o = class extends a {
  render() {
    return l`${this.renderApiKey()}`;
  }
  renderApiKey() {
    var t;
    return l` <umb-property-layout
      .label=${this.localize.term("ai_githubAuthKey")}
      .description=${this.localize.term("ai_githubAuthKeyDescription")}
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
o.styles = p`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
o = f([
  m("jumoo-tm-ai-github-config")
], o);
const d = o;
export {
  o as GitHubTranslatorConfigElement,
  d as default
};
//# sourceMappingURL=config-element-L0mjTBZ8.js.map
