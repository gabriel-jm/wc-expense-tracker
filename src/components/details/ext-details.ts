import '../card/ext-card.js'
import { css, raw } from 'lithen-tag-functions'
import { ExpenseTrackerElement } from '../../expense-tracker-element.js'
import { generateChartData } from '../../services/generate-chart-data.js'
import { doughnutChart } from '../chart/doughnut-chart.js'
import { Transaction, TransactionStore } from '../../stores/transactions-store.js'
import { Chart } from 'chart.js'

class ExtDetails extends ExpenseTrackerElement {
  #chart!: Chart

  constructor() {
    super()
    this.init()
  }
  
  get title() {
    return this.getAttribute('title') ?? ''
  }

  set title(value) {
    this.setAttribute('title', value)
  }

  init() {
    const { chartData } = generateChartData(this.title)
    const chartCanvas = this.select<HTMLCanvasElement>('div[chart] > canvas')!
    this.#chart = doughnutChart(chartCanvas, chartData)

    new TransactionStore().on('change', this.#update)
  }

  #update = (transaction: Transaction) => {
    if (transaction.type !== this.title) return

    const { totalAmount, chartData } = generateChartData(this.title)

    this.#chart.data = chartData
    this.#chart.update()

    this.select('p[total-amount]')!.textContent = `$${totalAmount}`
  }

  styling() {
    return css`
      div[slot=header] {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      div[slot=header] h3 {
        font-size: 1.3rem;
        font-weight: normal;
      }

      p[total-amount] {
        font-size: 1.3rem;
        color: #555;
      }

      div[chart] {
        width: 250px;
        height: 250px;
        margin: auto;
      }
    `
  }

  render() {
    const { totalAmount } = generateChartData(this.title)

    return raw`
      <ext-card class="${this.title.toLowerCase()}">
        <div slot="header">
          <h3>${this.title}</h3>
          <p total-amount>$${totalAmount.toString()}</p>
        </div>
        <div chart>
          <canvas></canvas>
        </div>
      </ext-card>
    `
  }
}

customElements.define('ext-details', ExtDetails)
