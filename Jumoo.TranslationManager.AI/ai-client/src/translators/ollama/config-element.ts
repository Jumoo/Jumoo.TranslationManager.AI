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
  defaultValues: Record<string, string> = {
    ollamaModel: "llama3.1",
  };

  render() {
    return html`${this.renderUrl("ollamaUrl")}${this.renderModel(
      "ollamaModel",
      "llama3.1"
    )}`;
  }

  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default OllamaTranslatorConfigElement;
