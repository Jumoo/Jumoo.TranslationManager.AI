import {
  TranslatorAIConfigElement,
  TranslatorAIConfigElementBase,
} from "../types";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("jumoo-tm-ai-openai-config")
export class OpenAITranslatorConfigElement
  extends TranslatorAIConfigElementBase
  implements TranslatorAIConfigElement
{
  render() {
    return html`${this.renderApiKey()}
    ${this.renderModel("openAiModel", "gpt-4o-mini")}`;
  }

  renderApiKey() {
    return html` <umb-property-layout
      .label=${this.localize.term("ai_openAIApiKey")}
      .description=${this.localize.term("ai_openAIApiKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="openAiKey"
          label="ApiKey"
          .value=${(this.settings?.additional?.openAiKey as string) ?? ""}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default OpenAITranslatorConfigElement;
