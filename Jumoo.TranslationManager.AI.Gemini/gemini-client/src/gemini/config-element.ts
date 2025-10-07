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
  defaultValues: Record<string, string> = {
    geminiModel: "gemini-2.0-flash",
  };

  render() {
    return html`${this.renderApiKey("geminiKey")}
    ${this.renderModel("geminiModel", "gemini-2.0-flash")}`;
  }
  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default GeminiTranslatorConfigElement;
