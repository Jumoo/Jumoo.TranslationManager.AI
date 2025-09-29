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
  defaultValues: Record<string, string> = {
    openAiModel: "gpt-4o-mini",
  };

  render() {
    return html`${this.renderApiKey("openAIApiKey")}
    ${this.renderModel("openAiModel", "gpt-4o-mini")}`;
  }

  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default OpenAITranslatorConfigElement;
