import { ManifestElement } from "@umbraco-cms/backoffice/extension-api";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { property } from "lit/decorators.js";

export interface ManifestAITranslatorConfig
  extends ManifestElement<TranslatorAIConfigElement> {
  type: "jumoo-tm-ai-translator";
}

export class TranslatorAIConfigElement extends HTMLElement {
  settings: Record<string, any> | null | undefined;
}

export class TranslatorAIConfigElementBase extends UmbLitElement {
  @property()
  settings: Record<string, any> | null | undefined;

  protected onUpdateOption(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input) return;

    const value = input.checked !== undefined ? input.checked : input.value;

    this.dispatchEvent(
      new CustomEvent("ai-translator-config-update", {
        bubbles: true,
        composed: true,
        detail: { name: input.id, value: value },
      })
    );
  }

  protected onUpdateAdditional(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !this.settings) return;

    const property = input.id;
    const value = input.checked !== undefined ? input.checked : input.value;

    const addtionalValue = {
      ...this.settings.additional,
      ...{ [property]: value },
    };

    this.dispatchEvent(
      new CustomEvent("ai-translator-config-update", {
        bubbles: true,
        composed: true,
        detail: { name: "additional", value: addtionalValue },
      })
    );
  }
}
