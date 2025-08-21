import {
  JUMOO_TM_CONNECTOR_SETTINGS_CONTEXT,
  TranslationConnectorConfigElement,
  TranslationConnectorConfigElementBase,
  TranslationConnectorSettingsContext,
} from "@jumoo/translate";
import {
  css,
  customElement,
  html,
  nothing,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { AiTranslate, AiTranslatorView } from "../api";
import { ManifestAITranslatorConfig } from "../translators";
//import { OpenAiTranslate } from "../api";

@customElement("jumoo-ai-config")
export class TranslationAiConnectorConfigElement
  extends TranslationConnectorConfigElementBase
  implements TranslationConnectorConfigElement
{
  #context?: TranslationConnectorSettingsContext;

  @state()
  translators?: Array<AiTranslatorView>;

  constructor() {
    super();

    this.consumeContext(JUMOO_TM_CONNECTOR_SETTINGS_CONTEXT, (_context) => {
      this.#context = _context;
      console.debug(this.#context);
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    this.translators = (await AiTranslate.aiTranslateTranslators()).data;
    console.log("T", this.translators);

    //const models = await OpenAiTranslate.AiTranslateModels();
    //console.log(models);
  }

  onConfigUpdate(e: CustomEvent) {
    this.#context?.update({ [e.detail.name]: e.detail.value });
  }

  @state()
  advancedExpanded: boolean = true;

  @state()
  promptExpanded: boolean = true;

  render() {
    return html` <umb-body-layout>
      <div class="layout">
        <div class="left">
          <uui-box>
            <p>
              In order to use an AI Translation API, you will need to supply an
              API Key.
            </p>
          </uui-box>
          <jumoo-tm-ui-box headline="AI Translation API">
            <div>
              ${this.renderService()} ${this.renderConfigView()}
              ${this.renderThrottle()} ${this.renderSplitOption()}
              ${this.renderSendAsHtmlOption()} ${this.renderTranslationMemory()}
            </div>
          </jumoo-tm-ui-box>
          <jumoo-tm-ui-box
            headline="Advanced Options"
            .collapsable=${true}
            .expanded=${false}
          >
            <div>
              ${this.renderModel()}${this.renderMaxTokens()}
              ${this.renderTemperature()}${this.renderFrequencyPenalty()}
              ${this.renderPresencePenalty()}${this.renderNucleusSamplingFactor()}
              ${this.renderConversationId()}${this.renderInstructions()}
              ${this.renderSeed()}${this.renderTopK()}
            </div>
          </jumoo-tm-ui-box>
          <jumoo-tm-ui-box
            headline="Prompt"
            .collapsable=${true}
            .expanded=${false}
          >
            ${this.renderPrompt()}</jumoo-tm-ui-box
          >
        </div>
      </div>
    </umb-body-layout>`;
  }

  renderService() {
    const options = this.translators
      ?.map((translator) => {
        if (!translator?.name) return undefined;

        return {
          name: translator.name,
          value: translator.alias,
          selected: translator.alias == this.settings?.translator,
        };
      })
      .filter((x) => x !== undefined);

    if (!options)
      return html`<h2>...${JSON.stringify(this.translators, null, 1)}</h2>`;

    return html`<umb-property-layout
      label=${this.localize.term("ai_library")}
      description=${this.localize.term("ai_libraryDescription")}
    >
      <div slot="editor">
        <uui-select
          placeholder="Select an option"
          .options=${options}
          id="translator"
          @change=${this.onUpdateOption}
        ></uui-select></div
    ></umb-property-layout>`;
  }

  renderConfigView(suffix?: string) {
    if (!this.settings?.translator) return nothing;

    return html`
      <umb-extension-slot
        type="jumoo-tm-ai-translator"
        .filter=${(ext: ManifestAITranslatorConfig) =>
          ext.alias == `${this.settings?.translator}${suffix ?? ""}`}
        .props=${{
          settings: this.settings,
        }}
        @ai-translator-config-update=${this.onConfigUpdate}
      ></umb-extension-slot>
    `;
  }

  renderThrottle() {
    const throttle = this.settings?.throttle || 250;

    return html` <umb-property-layout
      label=${this.localize.term("ai_throttle")}
      description=${this.localize.term("ai_throttleDescription")}
    >
      <div slot="editor">
        <uui-input
          id="throttle"
          value=${throttle}
          label="throttle (ms)"
          @change=${this.onUpdateOption}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderSplitOption() {
    return html` <umb-property-layout
      label=${this.localize.term("ai_split")}
      description=${this.localize.term("ai_splitDescription")}
    >
      <div slot="editor">
        <uui-checkbox
          label="Split Html"
          id="split"
          .checked=${(this.settings?.split as boolean) ?? false}
          @change=${this.onUpdateOption}
        >
        </uui-checkbox>
      </div>
    </umb-property-layout>`;
  }

  renderTranslationMemory() {
    return html` <umb-property-layout
      label=${this.localize.term("ai_translationMemory")}
      description=${this.localize.term("ai_translationMemoryDescription")}
    >
      <div slot="editor">
        <uui-checkbox
          label="Use Translation Memory"
          id="useTranslationMemory"
          .checked=${(this.settings?.useTranslationMemory as boolean) ?? false}
          @change=${this.onUpdateOption}
        >
        </uui-checkbox>
      </div>
    </umb-property-layout>`;
  }

  renderSendAsHtmlOption() {
    return html` <umb-property-layout
      label=${this.localize.term("ai_sendAsHtml")}
      description=${this.localize.term("ai_sendAsHtmlDescription")}
    >
      <div slot="editor">
        <uui-checkbox
          id="asHtml"
          label="Send as HTML"
          .checked=${(this.settings?.asHtml as boolean) ?? false}
          @change=${this.onUpdateOption}
        >
        </uui-checkbox>
      </div>
    </umb-property-layout>`;
  }

  renderModel() {
    return html`<umb-property-layout
      label=${this.localize.term("ai_model")}
      description=${this.localize.term("ai_modelDescription")}
    >
      <div slot="editor">
        <uui-input
          id="model"
          label="Model"
          value=${(this.settings?.model as string) ?? "gpt-4o-mini"}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderMaxTokens() {
    return html`<umb-property-layout
      label=${this.localize.term("ai_maxTokens")}
      description=${this.localize.term("ai_maxTokensDescription")}
    >
      <div slot="editor">
        <uui-input
          id="maxTokens"
          label="MaxTokens"
          type="number"
          value=${(this.settings?.maxTokens as number) ?? 500}
          @change=${this.onUpdateOption}
          min="0"
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderTemperature() {
    return html`<umb-property-layout
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
          value=${(this.settings?.temperature as number) ?? 1}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderFrequencyPenalty() {
    return html`<umb-property-layout
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
          value=${(this.settings?.frequencyPenalty as number) ?? 0.0}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderPresencePenalty() {
    return html`<umb-property-layout
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
          value=${(this.settings?.presencePenalty as number) ?? 0.0}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderNucleusSamplingFactor() {
    return html`<umb-property-layout
      label=${this.localize.term("ai_nucleusSampling")}
      description=${this.localize.term("ai_nucleusSamplingDescription")}
    >
      <div slot="editor">
        <uui-input
          id="nucleusSampling"
          label="NucleusSampling"
          type="number"
          value=${(this.settings?.nucleusSampling as number) ?? 1}
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
    return html` <umb-property-layout
      .label=${this.localize.term("ai_prompt")}
      .description=${this.localize.term("ai_promptDescription")}
      ><div slot="editor">
        <uui-textarea
          id="prompt"
          label="Prompt"
          .value=${(this.settings?.prompt as string) ??
          "You will be provided with sentences in {sourceLang}, and your task is to translate it into {targetLang}. If you cannot translate something, leave it as it is. Translate all the text below: \n\r{text}"}
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
    return html`<umb-property-layout
      label=${this.localize.term("ai_conversationId")}
      description=${this.localize.term("ai_conversationIdDescription")}
    >
      <div slot="editor">
        <uui-input
          id="conversationId"
          label="Conversation ID"
          value=${(this.settings?.conversationId as string) ?? ""}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderInstructions() {
    return html`<umb-property-layout
      label=${this.localize.term("ai_instructions")}
      description=${this.localize.term("ai_instructionsDescription")}
    >
      <div slot="editor">
        <uui-input
          id="instructions"
          label="Instructions"
          value=${(this.settings?.instructions as string) ?? ""}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderTopK() {
    return html`<umb-property-layout
      label=${this.localize.term("ai_topK")}
      description=${this.localize.term("ai_topKDescription")}
    >
      <div slot="editor">
        <uui-input
          id="topK"
          label="TopK"
          type="number"
          value=${(this.settings?.topK as number) ?? 1}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderSeed() {
    return html`<umb-property-layout
      label=${this.localize.term("ai_seed")}
      description=${this.localize.term("ai_seedDescription")}
    >
      <div slot="editor">
        <uui-input
          id="seed"
          label="Seed"
          type="number"
          value=${(this.settings?.seed as number) ?? null}
          @change=${this.onUpdateOption}
        >
        </uui-input>
      </div>
    </umb-property-layout>`;
  }

  static styles = css`
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

    .expanded {
      --uui-box-default-padding: 0;
    }

    jumoo-tm-ui-box .headline {
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
}

export default TranslationAiConnectorConfigElement;
