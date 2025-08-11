import { TranslationConnectorPendingElementBase as n } from "@jumoo/translate";
import { html as c, when as s, css as p, state as t, customElement as h } from "@umbraco-cms/backoffice/external/lit";
var m = Object.defineProperty, x = Object.getOwnPropertyDescriptor, u = (d, l, e, a) => {
  for (var i = a > 1 ? void 0 : a ? x(l, e) : l, r = d.length - 1, o; r >= 0; r--)
    (o = d[r]) && (i = (a ? o(l, e, i) : o(i)) || i);
  return a && i && m(l, e, i), i;
};
let v = class extends n {
  constructor() {
    super(...arguments), this.settingsExpanded = !1;
  }
  render() {
    var l;
    const d = (l = this.connector) == null ? void 0 : l.settings;
    return c`<div class="layout">
      ${this.renderSettings(d)} ${this.renderAdvanced(d)}
    </div>`;
  }
  renderSettings(d) {
    var l;
    return c` <uui-box
      ><div slot="headline">Settings</div>
      <div class="setting">
        <div class="title">Translator</div>
        <div class="value">
          ${((l = d == null ? void 0 : d.translator) == null ? void 0 : l.length) > 0 ? d.translator : "Error"}
        </div>
      </div>
      <div class="setting">
        <div class="title">Throttle</div>
        <div class="value">${(d == null ? void 0 : d.throttle) ?? "250"}</div>
      </div>
      <div class="setting">
        <div class="title">Split</div>
        <div class="value">${(d == null ? void 0 : d.split) ?? "false"}</div>
      </div>
      <div class="setting">
        <div class="title">As Html</div>
        <div class="value">${(d == null ? void 0 : d.split) ?? "false"}</div>
      </div>
    </uui-box>`;
  }
  renderAdvanced(d) {
    return c`<uui-box class="${this.settingsExpanded ? "" : "collapsed"}">
      <div
        class="headline"
        slot="headline"
        @click=${() => this.settingsExpanded = !this.settingsExpanded}
      >
        Advanced Settings
      </div>
      ${s(
      this.settingsExpanded,
      () => {
        var l, e, a;
        return c` <div class="setting">
              <div class="title">Model</div>
              <div class="value">${(d == null ? void 0 : d.model) ?? "gpt-4o-mini"}</div>
            </div>
            <div class="setting">
              <div class="title">Max Tokens</div>
              <div class="value">${(d == null ? void 0 : d.maxTokens) ?? "500"}</div>
            </div>
            <div class="setting">
              <div class="title">Temperature</div>
              <div class="value">${(d == null ? void 0 : d.temperature) ?? "1"}</div>
            </div>
            <div class="setting">
              <div class="title">Frequency Penalty</div>
              <div class="value">${(d == null ? void 0 : d.frequencyPenalty) ?? "0"}</div>
            </div>
            <div class="setting">
              <div class="title">Presence Penalty</div>
              <div class="value">${(d == null ? void 0 : d.presencePenalty) ?? "0"}</div>
            </div>
            <div class="setting">
              <div class="title">Nucleus Sampling</div>
              <div class="value">${(d == null ? void 0 : d.nucleusSampling) ?? "1"}</div>
            </div>
            <div class="setting">
              <div class="title">Conversation ID</div>
              <div class="value">
                ${((l = d == null ? void 0 : d.conversationId) == null ? void 0 : l.length) > 0 ? d.conversationId : "(None)"}
              </div>
            </div>
            <div class="setting">
              <div class="title">Instructions</div>
              <div class="value">
                ${((e = d == null ? void 0 : d.instructions) == null ? void 0 : e.length) > 0 ? d.instructions : "(None)"}
              </div>
            </div>
            <div class="setting">
              <div class="title">TopK</div>
              <div class="value">${(d == null ? void 0 : d.topK) ?? "1"}</div>
            </div>
            <div class="setting">
              <div class="title">Seed</div>
              <div class="value">
                ${((a = d == null ? void 0 : d.seed) == null ? void 0 : a.length) > 0 ? d.seed : "(Random)"}
              </div>
            </div>`;
      }
    )}
    </uui-box>`;
  }
};
v.styles = p`
    uui-box {
      --uui-box-default-padding: var(--uui-size-space-2) var(--uui-size-space-5);
    }

    .layout {
      display: flex;
      gap: var(--uui-size-space-5);
      flex-direction: column;
    }

    .setting {
      display: flex;
      gap: var(--uui-size-space-2);
      margin: var(--uui-size-space-5) 0;
    }

    .collapsed {
      --uui-box-default-padding: 0;
    }

    .title {
      font-weight: bold;
      min-width: 100px;
      text-align: right;
    }

    uui-box .headline {
      cursor: pointer;
    }

    .title::after {
      content: ":";
    }

    .value {
      font-style: italic;
    }
  `;
u([
  t()
], v.prototype, "settingsExpanded", 2);
v = u([
  h("jumoo-ai-pending")
], v);
const y = v;
export {
  v as TranslationAiConnectorPendingElement,
  y as default
};
//# sourceMappingURL=pending.view-CFwf7tAg.js.map
