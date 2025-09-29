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
  defaultValues: Record<string, string> = {
    githubModel: "gpt-4o-mini",
  };

  render() {
    return html`${this.renderApiKey("githubKey")}
    ${this.renderModel("githubModel", "gpt-4o-mini")}`;
  }

  static styles = css`
    uui-input,
    uui-select {
      width: 100%;
    }
  `;
}

export default GitHubTranslatorConfigElement;
