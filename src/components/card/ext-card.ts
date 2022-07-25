import { css, raw } from 'lithen-tag-functions'
import { ExpenseTrackerElement } from '../../expense-tracker-element.js'

class ExtCard extends ExpenseTrackerElement {
  styling() {
    return css`
      :host {
        display: block;
        background-color: #f0f0f0;
        border-radius: 2px;
        box-shadow: 0 2px 5px 3px #0005;
      }

      :host(.income) {
        border-bottom: 10px solid rgba(0, 250, 0, 0.5);
      }

      :host(.expense) {
        border-bottom: 10px solid rgba(250, 0, 0, 0.5);
      }

      header, section {
        padding: 12px 20px;
      }
    `
  }
  
  render() {
    return raw`
      <header>
        <slot name="header" />
      </header>
      <section>
        <slot />
      </section>
    `
  }
}

customElements.define('ext-card', ExtCard)
