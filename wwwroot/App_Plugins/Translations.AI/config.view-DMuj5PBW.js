import { TranslationConnectorConfigElementBase as v, JUMOO_TM_CONNECTOR_SETTINGS_CONTEXT as $ } from "@jumoo/translate";
import { html as r, when as c, nothing as b, css as g, state as d, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { c as _ } from "./index-CB8sLN95.js";
class f {
  static aiTranslateTranslators(t) {
    return ((t == null ? void 0 : t.client) ?? _).get({
      url: "/umbraco/tm-ai/api/v1/Translators",
      ...t
    });
  }
}
var T = Object.defineProperty, z = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, l = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? z(t, i) : t, u = e.length - 1, p; u >= 0; u--)
    (p = e[u]) && (a = (n ? p(t, i, a) : p(a)) || a);
  return n && a && T(t, i, a), a;
}, y = (e, t, i) => t.has(e) || m("Cannot " + i), h = (e, t, i) => (y(e, t, "read from private field"), t.get(e)), O = (e, t, i) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), P = (e, t, i, n) => (y(e, t, "write to private field"), t.set(e, i), i), s;
let o = class extends v {
  constructor() {
    super(), O(this, s), this.advancedExpanded = !0, this.promptExpanded = !0, this.consumeContext($, (e) => {
      P(this, s, e), console.debug(h(this, s));
    });
  }
  async connectedCallback() {
    super.connectedCallback(), this.translators = (await f.aiTranslateTranslators()).data, console.log("T", this.translators);
  }
  onConfigUpdate(e) {
    var t;
    (t = h(this, s)) == null || t.update({ [e.detail.name]: e.detail.value });
  }
  render() {
    return r` <umb-body-layout>
      <div class="layout">
        <div class="left">
          <uui-box>
            <p>
              In order to use an AI Translation API, you will need to supply an
              API Key.
            </p>
          </uui-box>
          <uui-box>
            <div slot="headline">AI Translation Api</div>
            <div>
              ${this.renderService()} ${this.renderConfigView()}
              ${this.renderThrottle()} ${this.renderSplitOption()}
              ${this.renderSendAsHtmlOption()}
            </div>
          </uui-box>
          <uui-box class="${this.advancedExpanded ? "" : "collapsed"}">
            <div
              class="headline"
              slot="headline"
              @click=${() => this.advancedExpanded = !this.advancedExpanded}
            >
              Advanced Options
            </div>
            ${c(
      this.advancedExpanded,
      () => r`<div>
                  ${this.renderModel()}${this.renderMaxTokens()}
                  ${this.renderTemperature()}${this.renderFrequencyPenalty()}
                  ${this.renderPresencePenalty()}${this.renderNucleusSamplingFactor()}
                  ${this.renderConversationId()}${this.renderInstructions()}
                  ${this.renderSeed()}${this.renderTopK()}
                </div>`
    )}
          </uui-box>
          <uui-box class="${this.promptExpanded ? "" : "collapsed"}"
            ><div
              class="headline"
              slot="headline"
              @click=${() => this.promptExpanded = !this.promptExpanded}
            >
              Prompt
            </div>
            ${c(
      this.promptExpanded,
      () => r`<div>${this.renderPrompt()}</div>`
    )}</uui-box
          >
        </div>
      </div>
    </umb-body-layout>`;
  }
  renderService() {
    var t;
    const e = (t = this.translators) == null ? void 0 : t.map((i) => {
      var n;
      if (i != null && i.name)
        return {
          name: i.name,
          value: i.alias,
          selected: i.alias == ((n = this.settings) == null ? void 0 : n.translator)
        };
    }).filter((i) => i !== void 0);
    return e ? r`<umb-property-layout
      label=${this.localize.term("ai_library")}
      description=${this.localize.term("ai_libraryDescription")}
    >
      <div slot="editor">
        <uui-select
          placeholder="Select an option"
          .options=${e}
          id="translator"
          @change=${this.onUpdateOption}
        ></uui-select></div
    ></umb-property-layout>` : r`<h2>...${JSON.stringify(this.translators, null, 1)}</h2>`;
  }
  renderConfigView(e) {
    var t;
    return (t = this.settings) != null && t.translator ? r`
      <umb-extension-slot
        type="jumoo-tm-ai-translator"
        .filter=${(i) => {
      var n;
      return i.alias == `${(n = this.settings) == null ? void 0 : n.translator}${e ?? ""}`;
    }}
        .props=${{
      settings: this.settings
    }}
        @ai-translator-config-update=${this.onConfigUpdate}
      ></umb-extension-slot>
    ` : b;
  }
  renderThrottle() {
    var t;
    const e = ((t = this.settings) == null ? void 0 : t.throttle) || 250;
    return r` <umb-property-layout
      label=${this.localize.term("ai_throttle")}
      description=${this.localize.term("ai_throttleDescription")}
    >
      <div slot="editor">
        <uui-input
          id="throttle"
          value=${e}
          label="throttle (ms)"
          @change=${this.onUpdateOption}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderSplitOption() {
    var e;
    return r` <umb-property-layout
      label=${this.localize.term("ai_split")}
      description=${this.localize.term("ai_splitDescription")}
    >
      <div slot="editor">
        <uui-checkbox
          label="Split Html"
          id="split"
          .checked=${((e = this.settings) == null ? void 0 : e.split) ?? !1}
          @change=${this.onUpdateOption}
        >
        </uui-checkbox>
      </div>
    </umb-property-layout>`;
  }
  renderSendAsHtmlOption() {
    var e;
    return r` <umb-property-layout
      label=${this.localize.term("ai_sendAsHtml")}
      description=${this.localize.term("ai_sendAsHtmlDescription")}
    >
      <div slot="editor">
        <uui-checkbox
          id="asHtml"
          label="Send as HTML"
          .checked=${((e = this.settings) == null ? void 0 : e.asHtml) ?? !1}
          @change=${this.onUpdateOption}
        >
        </uui-checkbox>
      </div>
    </umb-property-layout>`;
  }
  renderModel() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_model")}
      description=${this.localize.term("ai_modelDescription")}
    >
      <div slot="editor">
        <uui-input
          id="model"
          label="Model"
          value=${((e = this.settings) == null ? void 0 : e.model) ?? "gpt-4o-mini"}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderMaxTokens() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_maxTokens")}
      description=${this.localize.term("ai_maxTokensDescription")}
    >
      <div slot="editor">
        <uui-input
          id="maxTokens"
          label="MaxTokens"
          type="number"
          value=${((e = this.settings) == null ? void 0 : e.maxTokens) ?? 500}
          @change=${this.onUpdateOption}
          min="0"
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderTemperature() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_temperature")}
      description=${this.localize.term("ai_temperatureDescription")}
    >
      <div slot="editor">
        <uui-input
          id="temperature"
          label="Temperature"
          type="number"
          step="0.1"
          min="0"
          max="2"
          value=${((e = this.settings) == null ? void 0 : e.temperature) ?? 1}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderFrequencyPenalty() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_frequencyPenalty")}
      description=${this.localize.term("ai_frequencyPenaltyDescription")}
    >
      <div slot="editor">
        <uui-input
          id="frequencyPenalty"
          label="FrequencyPenalty"
          type="number"
          step="0.1"
          min="-2"
          max="2"
          value=${((e = this.settings) == null ? void 0 : e.frequencyPenalty) ?? 0}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderPresencePenalty() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_presencePenalty")}
      description=${this.localize.term("ai_presencePenaltyDescription")}
    >
      <div slot="editor">
        <uui-input
          id="presencePenalty"
          label="PresencePenalty"
          type="number"
          step="0.1"
          min="-2"
          max="2"
          value=${((e = this.settings) == null ? void 0 : e.presencePenalty) ?? 0}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderNucleusSamplingFactor() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_nucleusSampling")}
      description=${this.localize.term("ai_nucleusSamplingDescription")}
    >
      <div slot="editor">
        <uui-input
          id="nucleusSampling"
          label="NucleusSampling"
          type="number"
          value=${((e = this.settings) == null ? void 0 : e.nucleusSampling) ?? 1}
          @change=${this.onUpdateOption}
          min="0"
          max="1"
          step="0.01"
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderPrompt() {
    var e;
    return r` <umb-property-layout
      .label=${this.localize.term("ai_prompt")}
      .description=${this.localize.term("ai_promptDescription")}
      ><div slot="editor">
        <uui-textarea
          id="prompt"
          label="Prompt"
          .value=${((e = this.settings) == null ? void 0 : e.prompt) ?? "You will be provided with sentences in {sourceLang}, and your task is to translate it into {targetLang}"}
          @change=${this.onUpdateOption}
          rows="5"
        ></uui-textarea>
      </div>
    </umb-property-layout>`;
  }
  // renderToolCalls() {
  //   return html` <umb-property-layout
  //     label=${this.localize.term("ai_toolCalls")}
  //     description=${this.localize.term("ai_toolCallsDescription")}
  //   >
  //     <div slot="editor">
  //       <uui-checkbox
  //         label="Allow Multiple Tool Calls"
  //         id="allowMultipleToolCalls"
  //         .checked=${(this.settings?.allowMultipleToolCalls as boolean) ??
  //         false}
  //         @change=${this.onUpdateOption}
  //       >
  //       </uui-checkbox>
  //     </div>
  //   </umb-property-layout>`;
  // }
  renderConversationId() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_conversationId")}
      description=${this.localize.term("ai_conversationIdDescription")}
    >
      <div slot="editor">
        <uui-input
          id="conversationId"
          label="Conversation ID"
          value=${((e = this.settings) == null ? void 0 : e.conversationId) ?? ""}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderInstructions() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_instructions")}
      description=${this.localize.term("ai_instructionsDescription")}
    >
      <div slot="editor">
        <uui-input
          id="instructions"
          label="Instructions"
          value=${((e = this.settings) == null ? void 0 : e.instructions) ?? ""}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderTopK() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_topK")}
      description=${this.localize.term("ai_topKDescription")}
    >
      <div slot="editor">
        <uui-input
          id="topK"
          label="TopK"
          type="number"
          value=${((e = this.settings) == null ? void 0 : e.topK) ?? 1}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
  renderSeed() {
    var e;
    return r`<umb-property-layout
      label=${this.localize.term("ai_seed")}
      description=${this.localize.term("ai_seedDescription")}
    >
      <div slot="editor">
        <uui-input
          id="seed"
          label="Seed"
          type="number"
          value=${((e = this.settings) == null ? void 0 : e.seed) ?? null}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }
};
s = /* @__PURE__ */ new WeakMap();
o.styles = g`
    .layout {
      display: flex;
      gap: var(--uui-size-space-5);
    }

    .left,
    .right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: var(--uui-size-space-5);
    }

    .right {
      flex-basis: 30%;
      max-width: 325px;
    }

    .collapsed {
      --uui-box-default-padding: 0;
    }

    uui-box .headline {
      cursor: pointer;
    }

    @media screen and (max-width: 1280px) {
      .layout {
        flex-direction: column;
      }
      .layout > div {
        max-width: 100%;
      }
    }

    uui-input,
    uui-select {
      width: 100%;
    }
  `;
l([
  d()
], o.prototype, "translators", 2);
l([
  d()
], o.prototype, "advancedExpanded", 2);
l([
  d()
], o.prototype, "promptExpanded", 2);
o = l([
  x("jumoo-ai-config")
], o);
const w = o;
export {
  o as TranslationAiConnectorConfigElement,
  w as default
};
//# sourceMappingURL=config.view-DMuj5PBW.js.map
