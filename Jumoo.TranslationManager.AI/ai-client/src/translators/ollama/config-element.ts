import {
  TranslatorAIConfigElement,
  TranslatorAIConfigElementBase,
} from "../types";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("jumoo-tm-ai-ollama-config")
export class OllamaTranslatorConfigElement
  extends TranslatorAIConfigElementBase
  implements TranslatorAIConfigElement
{
  render() {
    return html`${this.renderUrl()}${this.renderModel()}`;
  }

  renderModel() {
    return html`<umb-property-layout
      .label=${this.localize.term("ai_ollamaModel")}
      .description=${this.localize.term("ai_ollamaModelDescription")}
      ><div slot="editor">
        <uui-input
          id="ollamaModel"
          label="Url"
          .value=${(this.settings?.additional["ollamaModel"] as string) ?? ""}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderUrl() {
    return html`<umb-property-layout
      .label=${this.localize.term("ai_ollamaUrl")}
      .description=${this.localize.term("ai_ollamaUrlDescription")}
      ><div slot="editor">
        <uui-input
          id="ollamaUrl"
          label="Url"
          .value=${(this.settings?.additional["ollamaUrl"] as string) ?? ""}
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

export default OllamaTranslatorConfigElement;
