export function assert(condition: unknown, msg?: string): asserts condition {
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

export function makeCanvas(
  width: number,
  height: number
): {canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D} {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')

  assert(ctx !== null)

  return {canvas, ctx}
}

export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
