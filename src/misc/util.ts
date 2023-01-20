export function assert(condition: boolean, msg?: string): asserts condition {
  if (!__DEV__) return

  if (!condition) {
    console.error(msg)
  }
}

export function time(name: string): void {
  if (__DEV__ && typeof window !== 'undefined') {
    performance.mark(`${name} start`)
  }
}

export function timeEnd(name: string): void {
  if (__DEV__ && typeof window !== 'undefined') {
    performance.mark(`${name} end`)
    performance.measure(name, `${name} start`, `${name} end`)
  }
}
