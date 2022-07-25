import {
  ArcElement,
  Chart,
  ChartData,
  DoughnutController,
  Legend,
  Tooltip
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Legend, Tooltip)

export function doughnutChart(chartCanvas: HTMLCanvasElement, data: ChartData) {
  return new Chart(chartCanvas, {
    type: 'doughnut',
    data
  })
}
