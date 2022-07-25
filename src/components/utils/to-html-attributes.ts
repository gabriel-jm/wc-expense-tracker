export function toHTMLAttributes(data: Record<string, unknown>) {
  return Object
    .entries(data)
    .reduce(
      (acc, [key, value]) => acc + ` ${key}="${value}"`,
      ''
    )
    .trim()
}
