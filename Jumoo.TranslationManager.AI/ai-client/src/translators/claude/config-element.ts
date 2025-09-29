import {
  TranslatorAIConfigElement,
  TranslatorAIConfigElementBase,
} from "../types";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("jumoo-tm-ai-claude-config")
export class ClaudeAITranslatorConfigElement
  extends TranslatorAIConfigElementBase
  implements TranslatorAIConfigElement
{
  defaultValues: Record<string, string> = {
    claudeAiModel: "claude-sonnet-4-0",
  };

  render() {
    return html`${this.renderApiKey("claudeAiKey")}
    ${this.renderModel("claudeAiModel", "claude-sonnet-4-0")}`;
  }

  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default ClaudeAITranslatorConfigElement;
