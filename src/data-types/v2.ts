export type V2 = [number, number]

// TODO: Should we be reusing these instead of making lots of copies?
export type V2RO = Readonly<V2>

// Probably use mutation as this is what 3js does.
export class Vec2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  clone(): Vec2 {
    return new Vec2(this.x, this.y)
  }

  normalise(): this {
    const {x, y} = this
    const len = Math.sqrt(x ** 2 + y ** 2)
    if (len === 0) return this
    const scale = 1 / len
    this.x *= scale
    this.y *= scale
    return this
  }

  limitMagnitude(limit: number): this {
    const {x, y} = this
    const len = Math.sqrt(x ** 2 + y ** 2)
    if (len < limit) return this

    const scale = limit / len
    this.x *= scale
    this.y *= scale
    return this
  }

  magnitude(): number {
    const {x, y} = this
    return Math.sqrt(x ** 2 + y ** 2)
  }

  add(other: Vec2): this {
    this.x += other.x
    this.y += other.y
    return this
  }

  subtract(other: Vec2): this {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  reverse(): this {
    this.x *= -1
    this.y *= -1
    return this
  }

  angle(): number {
    const {x, y} = this
    return Math.atan2(y, x) + (90 * Math.PI) / 180
  }

  scale(scale: number): this {
    this.x *= scale
    this.y *= scale
    return this
  }

  rotate(angle: number): this {
    const {x, y} = this
    const s = Math.sin(angle)
    const c = Math.cos(angle)

    this.x = c * x - s * y
    this.y = s * x + c * y
    return this
  }

  distance(other: Vec2): number {
    const dx = other.x - this.x
    const dy = other.y - this.y
    return Math.sqrt(dx ** 2 + dy ** 2)
  }
}

export function vec2(x: number, y: number): Vec2 {
  return new Vec2(x, y)
}

export namespace V2 {
  export const empty: V2RO = [0, 0]

  export function normalise(v: V2): V2 {
    const [x, y] = v
    const len = Math.sqrt(x ** 2 + y ** 2)

    if (len === 0) return v

    const scale = 1 / len

    return [x * scale, y * scale]
  }

  export function limitMagnitude(v: V2RO, limit: number): V2RO {
    const [x, y] = v
    const len = Math.sqrt(x ** 2 + y ** 2)

    if (len < limit) return v

    const scale = limit / len

    return [x * scale, y * scale]
  }

  export function magnitude(x: number, y: number): number {
    return Math.sqrt(x ** 2 + y ** 2)
  }

  export function magnitude2([x, y]: V2RO): number {
    return Math.sqrt(x ** 2 + y ** 2)
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

  // In radians, I think.
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

  export function distance(a: V2RO, b: V2RO): number {
    return magnitude(b[0] - a[0], b[1] - a[1])
  }
}
