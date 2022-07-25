export type FormDataTypes = 'string'|'number'|'boolean'

type FormDataTypeMap = {
  string: string
  number: number
  boolean: boolean
}

type FormDataParser = {
  [K in FormDataTypes]: (value: string) => FormDataTypeMap[K] | null
}

export interface ExtFormElement extends HTMLFormElement {
  get<T = unknown>(name: string, type: FormDataTypes): T | null
  getData<T extends Record<string, unknown | null>>(schema: Record<string, FormDataTypes>): T
}

const formDataParser: FormDataParser = {
  string(value) {
    return value || null
  },

  number(value) {
    return value
      ? Number(value)
      : null
  },

  boolean(value) {
    if (value === 'true') return true
    if (value === 'false') return false

    return null
  }
}

class ExtForm extends HTMLFormElement implements ExtFormElement {
  get<T = unknown>(name: string, type: FormDataTypes): T | null {
    const formControl = this.elements.namedItem(name) as HTMLInputElement

    if (!formControl) return null

    return formDataParser[type](formControl.value) as unknown as T
  }

  getData<T extends Record<string, unknown | null>>(schema: Record<string, FormDataTypes>): T {
    return Object.fromEntries(
      Object
        .entries(schema)
        .map(([fieldName, fieldType]) => {
          return [fieldName, this.get(fieldName, fieldType)]
        })
    ) as T
  }
}

customElements.define('ext-form', ExtForm, { extends: 'form' })
