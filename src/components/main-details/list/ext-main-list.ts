import { css, html } from 'lithen-tag-functions'
import { ExpenseTrackerElement } from '../../../expense-tracker-element.js'
import { Transaction, TransactionStore } from '../../../stores/transactions-store.js'
import { moneyIcon } from '../../icons/money-icon.js'
import { trashIcon } from '../../icons/trash-icon.js'

class ExtMainList extends ExpenseTrackerElement {
  #transactionStore = new TransactionStore()

  constructor() {
    super()
    this.applyRender()

    this.init()
  }

  init() {
    this.#transactionStore
      .on(
        'add',
        transaction => this.select('ul')?.append(
          this.#createTransactionItem(transaction)
        )
      )
      .on(
        'delete',
        ({ id }) => this.select(`li[key-id="${id}"]`)?.remove()
      )
  }
  
  #createTransactionItem = (transaction: Transaction) => {
    return html`
      <li class="list-item" key-id="${transaction.id}">
        <div class="${transaction.type.toLowerCase()}">
          ${moneyIcon()}
        </div>
        
        <div class="transaction-details">
          <p>${transaction.category}</p>
          <span>
            $${transaction.amount} - ${transaction.date}
          </span>
        </div>

        <button
          on-click=${() => {
            this.#transactionStore.delete(transaction.id)
          }}
        >
          ${trashIcon()}
        </button>
      </li>
    `
  }
  
  styling() {
    const defaultIconStyles = css`
      min-width: 40px;
      height: 40px;
      color: #f0f0f0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    `

    return css`
      ul {
        padding: 8px;
        margin: 20px 0;
        max-height: 150px;
        overflow-y: scroll
      }

      .list-item {
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 14px 0;
      }

      .list-item:first-of-type {
        margin-top: 0;
      }

      .list-item:last-of-type {
        margin-bottom: 0;
      }

      .income {
        ${defaultIconStyles}
        background-color: rgba(0, 150, 0, 0.5);
      }

      .expense {
        ${defaultIconStyles}
        background-color: rgba(180, 0, 0, 0.6);
      }

      .money-icon, .trash-icon {
        width: 22px;
        height: 22px;
      }

      .transaction-details {
        flex: 2;
      }

      p {
        font-size: 1.1rem;
      }

      span {
        color: #707070;
        font-size: 0.85rem;
      }

      button {
        width: 40px;
        height: 40px;
        border: 1px solid #dfdfdf;
        background-color: transparent;
        padding: 8px;
        border-radius: 4px;
        color: #707070;
        cursor: pointer;
        transition: all 0.25s ease-in-out;
      }

      button:hover {
        color: #333;
        border-color: #ccc;
      }
    `
  }

  render() {
    const transactions = this.#transactionStore.getAll()

    return html`
      <ul>
        ${transactions.map(this.#createTransactionItem)}
      </ul>
    `
  }
}

customElements.define('ext-main-list', ExtMainList)
