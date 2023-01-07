export type V2 = [number, number]

export function normaliseV2(v: V2): V2 {
  const [x, y] = v
  const len = Math.sqrt(x ** 2 + y ** 2)

  if (len === 0) return v

  const scale = 1 / len

  return [x * scale, y * scale]
}

export const emptyV2: Readonly<V2> = [0, 0]

export function limitMagnitudeV22(v: V2, limit: number): V2 {
  const [x, y] = v
  const len = Math.sqrt(x ** 2 + y ** 2)

  if (len < limit) return v

  const scale = limit / len

  return [x * scale, y * scale]
}

export function addV2(a: Readonly<V2>, b: Readonly<V2>): V2 {
  return [a[0] + b[0], a[1] + b[1]]
}

export function reverseV2([a, b]: V2): V2 {
  return [-a, -b]
}

export function scaleV2([a, b]: Readonly<V2>, scale: number): V2 {
  return [a * scale, b * scale]
}

export function rotateV2([x, y]: V2, angle: number): V2 {
  const s = Math.sin(angle)
  const c = Math.cos(angle)

  return [c * x - s * y, s * x + c * y]
}
