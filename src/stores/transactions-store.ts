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
  transactions: Set<Transaction> = new Set()

  constructor() {
    if (!TransactionStore.#instance) {
      super('add', 'delete')
      TransactionStore.#instance = this
    }

    return TransactionStore.#instance
  }

  getAll() {
    return Array.from(this.transactions)
  }

  add(transaction: Transaction) {
    this.transactions.add(transaction)
    this.emit('add', transaction)
  }

  delete(id: string) {
    const transaction = this.getAll().find(
      transaction => transaction.id === id
    )

    if (!transaction) return

    this.transactions.delete(transaction)
    this.emit('delete', transaction)
  }
}
