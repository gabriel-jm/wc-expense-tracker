import { ChartData } from 'chart.js'
import { expenseCategories, incomeCategories, resetCategories } from '../constants/category-constants.js'
import { TransactionStore } from '../stores/transactions-store.js'

export function generateChartData(type: string) {
  resetCategories()

  const transactions = new TransactionStore().getAll()
  const transactionsPerType = transactions.filter(transaction => {
    return transaction.type === type
  })

  const totalAmount = transactionsPerType.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)

  const categories = type === 'Income' ? incomeCategories : expenseCategories

  transactionsPerType.forEach(transaction => {
    const category = categories.find(
      category => category.type === transaction.category
    )

    if (category) category.amount += transaction.amount
  })

  const categoriesInUse = categories.filter(category => category.amount > 0)

  const chartData: ChartData = {
    datasets: [
      {
        data: categoriesInUse.map(category => category.amount),
        backgroundColor: categoriesInUse.map(category => category.color),
        hoverOffset: 2,
      }
    ],
    labels: categoriesInUse.map(category => category.type),
  }

  return {
    categoriesInUse,
    totalAmount,
    chartData
  }
}
