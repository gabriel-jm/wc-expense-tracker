import './components/details/ext-details.js'
import './components/main-details/ext-main-details.js'
import { css, raw } from 'lithen-tag-functions'
import { ExpenseTrackerElement } from './expense-tracker-element.js'
import { TransactionService } from './services/transactions-service.js'
import { TransactionStore } from './stores/transactions-store.js'

class ExtRoot extends ExpenseTrackerElement {
  styling() {
    return css`
      :host {
        display: grid;
        justify-content: center;
        align-items: center;
        height: 100vh;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        padding: 0 48px;
      }
    `
  }
  
  render() {
    const savedTransactions = new TransactionService().getAll()
    new TransactionStore(savedTransactions)

    return raw`
      <ext-details title="Income" />
      <ext-main-details />
      <ext-details title="Expense" />
    `
  }
}

customElements.define('ext-root', ExtRoot)
