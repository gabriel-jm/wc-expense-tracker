import { TransactionService } from '../services/transactions-service.js'
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
  
  #transactionService = new TransactionService()

  constructor(transactions?: Transaction[]) {
    if (!TransactionStore.#instance) {
      super('change', 'add', 'delete')

      this.#setInitialValue(transactions)
      TransactionStore.#instance = this
    }

    return TransactionStore.#instance
  }

  #setInitialValue(transactions?: Transaction[]) {
    if (transactions) {
      this.transactions = new Set(transactions)

      for (const transaction of transactions) {
        if (transaction.type === 'Income') {
          this.totalAmount += transaction.amount
        }
    
        if (transaction.type === 'Expense') {
          this.totalAmount -= transaction.amount
        }
      }
    }
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

    this.#transactionService.save(this.getAll())
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

    this.#transactionService.save(this.getAll())
    this.emit(['delete', 'change'], transaction)
  }
}
