import { ManifestElement } from "@umbraco-cms/backoffice/extension-api";
import { html } from "@umbraco-cms/backoffice/external/lit";
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

  defaultValues?: Record<string, string>;

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.defaultValues) return;
    if (!this.settings?.additional) return;

    let changes: Record<string, string> = {};
    let hasChanges = false;

    for (const defaultValue in this.defaultValues) {
      if (!this.settings?.additional[defaultValue]) {
        changes[defaultValue] = this.defaultValues[defaultValue];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      const addtionalValue = { ...this.settings.additional, ...changes };
      this.dispatchEvent(
        new CustomEvent("ai-translator-config-update", {
          bubbles: true,
          composed: true,
          detail: { name: "additional", value: addtionalValue },
        })
      );
    }
  }

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

  renderApiKey(alias: string) {
    return html` <umb-property-layout
      .label=${this.localize.term("ai_" + alias)}
      .description=${this.localize.term("ai_" + alias + "Description")}
      ><div slot="editor">
        <uui-input
          .id=${alias}
          label="ApiKey"
          .value=${this._valueOrDefault(alias, "")}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  renderUrl(alias: string) {
    return html`<umb-property-layout .label=${this.localize.term("ai_" + alias)}
      ><div slot="editor">
        <uui-input
          .id=${alias}
          label="Url"
          .value=${this._valueOrDefault(alias, "")}
          @change=${this.onUpdateAdditional}
        ></uui-input>
        <div><em>${this.localize.term("ai_" + alias + "Description")}</em></div>
      </div>
    </umb-property-layout>`;
  }

  renderModel(alias: string, defaultModel: string) {
    return html`<umb-property-layout
      .label=${this.localize.term("ai_" + alias)}
      .description=${this.localize.term("ai_" + alias + "Description")}
      ><div slot="editor">
        <uui-input
          .id=${alias}
          label="Model"
          .value=${this._valueOrDefault(alias, defaultModel)}
          @change=${this.onUpdateAdditional}
        ></uui-input>
      </div>
    </umb-property-layout>`;
  }

  protected _valueOrDefault(alias: string, defaultValue: string) {
    if (!this.settings?.additional) return defaultValue;
    return (this.settings?.additional[alias] as string) ?? defaultValue;
  }
}
