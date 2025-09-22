import {
  TranslatorAIConfigElement,
  TranslatorAIConfigElementBase,
} from "@jumoo/translate-ai";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("jumoo-tm-ai-gemini-config")
export class GeminiTranslatorConfigElement
  extends TranslatorAIConfigElementBase
  implements TranslatorAIConfigElement
{
  render() {
    return html`${this.renderApiKey()} ${this.renderModel()}`;
  }

  renderApiKey() {
    return html` <umb-property-layout
      .label=${this.localize.term("gemini_apiKey")}
      .description=${this.localize.term("gemini_apiKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="geminiKey"
          label="ApiKey"
          .value=${(this.settings?.additional?.geminiKey as string) ?? ""}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderModel() {
    return html`<umb-property-layout
      .label=${this.localize.term("gemini_model")}
      .description=${this.localize.term("gemini_modelDescription")}
      ><div slot="editor">
        <uui-input
          id="geminiModel"
          label="Model"
          .value=${(this.settings?.additional["geminiModel"] as string) ??
          "gemini-2.0-flash"}
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

export default GeminiTranslatorConfigElement;
