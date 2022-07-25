import '../../form/ext-form.js'
import { css, html } from 'lithen-tag-functions'
import { ExpenseTrackerElement } from '../../../expense-tracker-element.js'
import { ExtFormElement } from '../../form/ext-form.js'
import { Transaction, TransactionStore } from '../../../stores/transactions-store.js'
import { Category, expenseCategories, incomeCategories } from '../../../constants/category-constants.js'
import { firstHtml } from '../../utils/first-html.js'

class ExtMainForm extends ExpenseTrackerElement {
  #transactionStore = new TransactionStore()

  styling() {
    return css`
      form {
        display: grid;
        grid-template-columns: repeat(auto-fit, 50%);
        grid-template-rows: repeat(3, auto);
        gap: 16px;
      }

      label {
        display: block;
        width: 100%;
      }
      
      input, select {
        width: inherit;
        display: block;
        margin-top: 4px;
      }

      button {
        width: 100%;
        grid-column: 1 / 3;
      }
    `
  }

  render() {
    function createCategoryOptions(categoryList: Category[]) {
      return categoryList.map(category => firstHtml<HTMLOptionElement>`
        <option value="${category.type}">
          ${category.type}
        </option>
      `)
    }

    const incomeCategoryOptions = createCategoryOptions(incomeCategories)
    const expenseCategoryOptions = createCategoryOptions(expenseCategories)

    const onSubmit = (event: Event) => {
      event.preventDefault()
      const form = event.target as ExtFormElement

      const formData = form.getData<Omit<Transaction, 'id'>>({
        type: 'string',
        category: 'string',
        amount: 'number',
        date: 'string'
      })

      this.#transactionStore.add({
        id: crypto.randomUUID(),
        ...formData
      })
    }

    const onCategoryChange = (event: Event) => {
      const value = (event.target as HTMLSelectElement).value
      const categoryList = value === 'Income'
        ? incomeCategoryOptions
        : expenseCategoryOptions
            
      const categoriesSelect = this.select<HTMLSelectElement>('select[name=category]')!
      categoriesSelect.replaceChildren(...categoryList)
      categoriesSelect.value = categoryList.at(0)!.value
    }

    return html`
      <form is="ext-form" on-submit=${onSubmit}>
        <label>
          <span>Type</span>
          <select name="type" on-change=${onCategoryChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>

        <label>
          <span>Category</span>
          <select name="category">
            ${incomeCategoryOptions}
          </select>
        </label>

        <label>
          <span>Amount</span>
          <input type="number" name="amount" min="0" />
        </label>

        <label>
          <span>Date</span>
          <input type="date" name="date" />
        </label>

        <button>Create</button>
      </form>
    `
  }
}

customElements.define('ext-main-form', ExtMainForm)
