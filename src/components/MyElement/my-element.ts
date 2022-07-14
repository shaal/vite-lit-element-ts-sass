/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './my-element.css';
import componentStyle from '../../styles/component.css';

/**
 * An example element.
 *
 * @slot default - The default, and only slot for this element.
 * @csspart button - The button. Click it.
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = unsafeCSS([styles, componentStyle]);

  /**
   * The name to say "Hello" to.
   */
  @property({ type: String })
  name = 'MyElement that extends LitElement';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render(): TemplateResult {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  _onClick(): void {
    this.count++;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
