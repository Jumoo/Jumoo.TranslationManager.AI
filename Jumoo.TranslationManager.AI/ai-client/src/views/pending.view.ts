import {
  TranslationConnectorPendingElement,
  TranslationConnectorPendingElementBase,
} from "@jumoo/translate";
import {
  css,
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";

type AiSettings = {
  throttle: string;
  split: string;
  asHtml: string;
  useTranslationMemory: string;
  model: string;
  maxTokens: string;
  temperature: string;
  frequencyPenalty: string;
  presencePenalty: string;
  nucleusSampling: string;
  conversationId: string;
  instructions: string;
  topK: string;
  seed: string;
  translator: string;
};

@customElement("jumoo-ai-pending")
export class TranslationAiConnectorPendingElement
  extends TranslationConnectorPendingElementBase
  implements TranslationConnectorPendingElement
{
  @state()
  settingsExpanded: boolean = false;

  render() {
    const settings = this.connector?.settings as AiSettings;
    return html`<div class="layout">
      ${this.renderSettings(settings)} ${this.renderAdvanced(settings)}
    </div>`;
  }

  renderSettings(settings: AiSettings) {
    return html` <jumoo-tm-ui-box headline="Settings">
      <div class="settings-box">
        <div class="setting">
          <div class="title">Translator</div>
          <div class="value">
            ${settings?.translator?.length > 0 ? settings.translator : "Error"}
          </div>
        </div>
        <div class="setting">
          <div class="title">Throttle</div>
          <div class="value">${settings?.throttle ?? "250"}</div>
        </div>
        <div class="setting">
          <div class="title">Split</div>
          <div class="value">${settings?.split ?? "false"}</div>
        </div>
        <div class="setting">
          <div class="title">As Html</div>
          <div class="value">${settings?.asHtml ?? "false"}</div>
        </div>
        <div class="setting">
          <div class="title">Translation Memory</div>
          <div class="value">${settings?.useTranslationMemory ?? "false"}</div>
        </div>
      </div>
    </jumoo-tm-ui-box>`;
  }

  renderAdvanced(settings: AiSettings) {
    return html`<jumoo-tm-ui-box
      headline="Advanced Settings"
      .collapsable=${true}
      .expanded=${false}
      ><div class="settings-box">
        <div class="setting">
          <div class="title">Max Tokens</div>
          <div class="value">${settings?.maxTokens ?? "500"}</div>
        </div>
        <div class="setting">
          <div class="title">Temperature</div>
          <div class="value">${settings?.temperature ?? "1"}</div>
        </div>
        <div class="setting">
          <div class="title">Frequency Penalty</div>
          <div class="value">${settings?.frequencyPenalty ?? "0"}</div>
        </div>
        <div class="setting">
          <div class="title">Presence Penalty</div>
          <div class="value">${settings?.presencePenalty ?? "0"}</div>
        </div>
        <div class="setting">
          <div class="title">Nucleus Sampling</div>
          <div class="value">${settings?.nucleusSampling ?? "1"}</div>
        </div>
        <div class="setting">
          <div class="title">Conversation ID</div>
          <div class="value">
            ${settings?.conversationId?.length > 0
              ? settings.conversationId
              : "(None)"}
          </div>
        </div>
        <div class="setting">
          <div class="title">Instructions</div>
          <div class="value">
            ${settings?.instructions?.length > 0
              ? settings.instructions
              : "(None)"}
          </div>
        </div>
        <div class="setting">
          <div class="title">TopK</div>
          <div class="value">${settings?.topK ?? "1"}</div>
        </div>
        <div class="setting">
          <div class="title">Seed</div>
          <div class="value">
            ${settings?.seed?.length > 0 ? settings.seed : "(Random)"}
          </div>
        </div>
      </div>
    </jumoo-tm-ui-box>`;
  }
  static styles = css`
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

    .title {
      font-weight: bold;
      min-width: 150px;
      text-align: right;
    }

    uui-box,
    jumoo-tm-ui-box {
      --uui-box-default-padding: 0 var(--uui-size-space-5);
    }

    .settings-box {
      padding: var(--uui-size-space-3);
    }

    .title::after {
      content: ":";
    }

    .value {
      font-style: italic;
    }
  `;
}

export default TranslationAiConnectorPendingElement;
