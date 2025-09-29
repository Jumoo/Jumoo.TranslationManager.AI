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
  defaultValues: Record<string, string> = {
    azureModel: "gpt-4o-mini",
  };

  render() {
    return html`${this.renderApiKey("azureKey")} ${this.renderUrl("azureUrl")}
    ${this.renderModel("azureModel", "gpt-4o-mini")}`;
  }

  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default AzureTranslatorConfigElement;
