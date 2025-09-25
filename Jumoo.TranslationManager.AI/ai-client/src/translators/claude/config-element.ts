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
    return html`${this.renderApiKey()}
    ${this.renderModel("claudeAiModel", "claude-sonnet-4-0")}`;
  }

  renderApiKey() {
    return html` <umb-property-layout
      .label=${this.localize.term("ai_claudeAiApiKey")}
      .description=${this.localize.term("ai_claudeAiApiKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="claudeAiKey"
          label="ApiKey"
          .value=${(this.settings?.additional?.claudeAiKey as string) ?? ""}
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

export default ClaudeAITranslatorConfigElement;
