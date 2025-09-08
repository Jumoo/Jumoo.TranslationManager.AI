import {
  TranslatorAIConfigElement,
  TranslatorAIConfigElementBase,
} from "../types";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("jumoo-tm-ai-azure-config")
export class AzureTranslatorConfigElement
  extends TranslatorAIConfigElementBase
  implements TranslatorAIConfigElement
{
  render() {
    return html`${this.renderApiKey()} ${this.renderUrl()}`;
  }

  renderApiKey() {
    return html` <umb-property-layout
      .label=${this.localize.term("ai_azureApiKey")}
      .description=${this.localize.term("ai_azureApiKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="azureKey"
          label="ApiKey"
          .value=${(this.settings?.additional?.azureKey as string) ?? ""}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderUrl() {
    return html`<umb-property-layout
      .label=${this.localize.term("ai_azureUrl")}
      .description=${this.localize.term("ai_azureUrlDescription")}
      ><div slot="editor">
        <uui-input
          id="url"
          label="Url"
          .value=${(this.settings?.additional.url as string) ?? ""}
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

export default AzureTranslatorConfigElement;
