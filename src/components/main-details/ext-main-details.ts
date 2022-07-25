import '../card/ext-card.js'
import './form/ext-main-form.js'
import './list/ext-main-list.js'
import { css, html } from 'lithen-tag-functions'
import { ExpenseTrackerElement } from '../../expense-tracker-element.js'

class ExtMainDetails extends ExpenseTrackerElement {
  styling() {
    return css`
      h1 {
        font-size: 1.5rem;
        font-weight: normal;
      }

      .balance {
        font-weight: normal;
        font-size: 1.3rem;
        text-align: center;
      }

      .divider {
        display: block;
        height: 1px;
        background-color: #ccc;
        margin: 18px 0;
      }
    `
  }
  
  render() {
    return html`
      <ext-card>
        <h1 slot="header">Expense Tracker</h1>
        <div>
          <h5 class="balance">Total Balance $100</h5>
          <span class="divider"></span>
          <ext-main-form />
          <ext-main-list />
        </div>
      </ext-card>
    `
  }
}

customElements.define('ext-main-details', ExtMainDetails)
