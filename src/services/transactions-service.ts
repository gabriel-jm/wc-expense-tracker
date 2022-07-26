import { Transaction } from '../stores/transactions-store.js'

export class TransactionService {
  getAll() {
    const jsonData = localStorage.getItem('expense-tracker@transactions')

    return JSON.parse(jsonData ?? '[]')
  }
  
  save(transactions: Transaction[]) {
    localStorage.setItem(
      'expense-tracker@transactions',
      JSON.stringify(transactions)
    )
  }
}
