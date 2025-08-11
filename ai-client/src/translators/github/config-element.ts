import {
  TranslatorAIConfigElement,
  TranslatorAIConfigElementBase,
} from "../types";
import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("jumoo-tm-ai-github-config")
export class GitHubTranslatorConfigElement
  extends TranslatorAIConfigElementBase
  implements TranslatorAIConfigElement
{
  render() {
    return html`${this.renderApiKey()}`;
  }

  renderApiKey() {
    return html` <umb-property-layout
      .label=${this.localize.term("ai_githubAuthKey")}
      .description=${this.localize.term("ai_githubAuthKeyDescription")}
      ><div slot="editor">
        <uui-input
          id="apiKey"
          label="ApiKey"
          .value=${(this.settings?.apiKey as string) ?? ""}
          @change=${this.onUpdateOption}
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

export default GitHubTranslatorConfigElement;
