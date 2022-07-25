import { EventEmitter } from './event-emitter.js'

export interface Transaction {
  id: string
  type: string
  amount: number
  category: string
  date: string
}

export class TransactionStore extends EventEmitter<Transaction> {
  static #instance: TransactionStore
  totalAmount = 0
  transactions: Set<Transaction> = new Set()

  constructor() {
    if (!TransactionStore.#instance) {
      super('change', 'add', 'delete')
      TransactionStore.#instance = this
    }

    return TransactionStore.#instance
  }

  getAll() {
    return Array.from(this.transactions)
  }

  add(transaction: Transaction) {
    this.transactions.add(transaction)

    if (transaction.type === 'Income') {
      this.totalAmount += transaction.amount
    }

    if (transaction.type === 'Expense') {
      this.totalAmount -= transaction.amount
    }

    this.emit(['add', 'change'], transaction)
  }

  delete(id: string) {
    const transaction = this.getAll().find(
      transaction => transaction.id === id
    )

    if (!transaction) return

    if (transaction.type === 'Income') {
      this.totalAmount -= transaction.amount
    }

    if (transaction.type === 'Expense') {
      this.totalAmount += transaction.amount
    }

    this.transactions.delete(transaction)
    this.emit(['delete', 'change'], transaction)
  }
}
