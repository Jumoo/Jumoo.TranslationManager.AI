import {
  TranslationConnectorJobElement,
  TranslationConnectorJobElementBase,
} from "@jumoo/translate";
import {
  css,
  customElement,
  html,
  nothing,
  state,
} from "@umbraco-cms/backoffice/external/lit";

type AiResults = {
  modelUsed: string;
  tokensUsed: number;
  inputTokens: number;
  outputTokens: number;
  extraMessage: string;
};
@customElement("jumoo-ai-submitted")
export class TranslationAiSubmittedElement
  extends TranslationConnectorJobElementBase
  implements TranslationConnectorJobElement
{
  @state()
  providerProperties?: AiResults | null = null;

  async connectedCallback() {
    super.connectedCallback();
    if (!this.job?.providerProperties) return;
    this.providerProperties = JSON.parse(this.job.providerProperties);
  }

  render() {
    return html`<jumoo-tm-ui-box
      headline="AI Connector"
      description="Manage the AI files for this translation"
    >
      <div class="info">${this.renderInfo()}</div>
      ${this.renderExtra()}
    </jumoo-tm-ui-box>`;
  }

  renderInfo() {
    return html` ${this.renderValue(
      "modelUsed",
      this.providerProperties?.modelUsed
    )}
    ${this.renderValue(
      "tokensUsed",
      this.providerProperties?.tokensUsed,
      `Input/Output: ${this.providerProperties?.inputTokens}/${this.providerProperties?.outputTokens}`
    )}`;
  }

  renderExtra() {
    if ((this.providerProperties?.extraMessage ?? "").length == 0)
      return nothing;
    return html`${this.renderValue(
      "extra",
      this.providerProperties?.extraMessage
    )}`;
  }

  renderValue(name: string, value: any, subvalue?: any) {
    return html`<div class="property">
      <h3>${this.localize.term("ai_" + name)}</h3>
      <div>
        ${value}
        ${!subvalue ? "" : html`<div class="subvalue">${subvalue}</div>`}
      </div>
    </div>`;
  }

  static styles = css`
    h3 {
      margin: 0;
    }

    .property {
      display: flex;
      flex-basis: 50%;
      gap: 10px;
    }

    .info {
      display: flex;
      // justify-content: space-between;
    }
  `;
}

export default TranslationAiSubmittedElement;
