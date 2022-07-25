import { html } from 'lithen-tag-functions'

export function firstHtml<T extends Element = Element>(
  string: TemplateStringsArray, ...values: any[]
) {
  const docFrag = html(string, ...values)

  return docFrag.firstChild as T
}
