export function isString(str: unknown): boolean {
  return typeof str === 'string' || str instanceof String
}
