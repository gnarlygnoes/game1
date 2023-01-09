export type V2 = [number, number]
export type V2RO = Readonly<V2>

export namespace V2 {
  export const empty: V2RO = [0, 0]

  export function normalise(v: V2): V2 {
    const [x, y] = v
    const len = Math.sqrt(x ** 2 + y ** 2)

    if (len === 0) return v

    const scale = 1 / len

    return [x * scale, y * scale]
  }

  export function limitMagnitude(v: V2, limit: number): V2 {
    const [x, y] = v
    const len = Math.sqrt(x ** 2 + y ** 2)

    if (len < limit) return v

    const scale = limit / len

    return [x * scale, y * scale]
  }

  export function add(a: V2RO, b: V2RO): V2 {
    return [a[0] + b[0], a[1] + b[1]]
  }

  export function subtract(a: V2RO, b: V2RO): V2 {
    return [a[0] - b[0], a[1] - b[1]]
  }

  export function reverse([a, b]: V2RO): V2 {
    return [-a, -b]
  }

  export function angle([x, y]: V2RO): number {
    return Math.atan2(y, x) + (90 * Math.PI) / 180
  }

  export function scale([a, b]: V2RO, scale: number): V2 {
    return [a * scale, b * scale]
  }

  export function rotate([x, y]: V2RO, angle: number): V2 {
    const s = Math.sin(angle)
    const c = Math.cos(angle)

    return [c * x - s * y, s * x + c * y]
  }
}
