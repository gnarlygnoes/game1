import {createBuckets} from './collisions'
import {assert} from '../../misc/util'
import {Camera} from '../../camera'

const numMovers = 2000

enum I {
  // 2d vec
  pos = 0,
  size = 2,
  direction = 4,
  velocity = 6,
  thrust = 8,

  // single values
  rotation = 10,
  mass = 11,
  maxVelocity = 12,
  visible = 13,
  len = 14,
}

type Id = number

class Movers2 extends Float32Array {
  constructor() {
    super(numMovers)
  }

  posX(id: Id): number {
    return this[id]
  }
  posY(id: Id): number {
    return this[id + 1]
  }

  width(id: Id): number {
    return this[id + I.size]
  }
  height(id: Id): number {
    return this[id + I.size + 1]
  }

  visible(id: Id): boolean {
    return !!this[id + I.visible]
  }

  rotation(id: Id): number {
    return this[id + I.rotation]
  }

  updateMover(id: Id, timeSince: number, camera: Camera) {
    const rotation = this.rotation(id)
    if (rotation !== 0) {
      const angle = (timeSince / 1000) * rotation
      const i = id + I.direction
      this.rotate(i, angle)
      this.normalise(i)
    }
    // TODO
  }

  rotate(i: number, angle: number) {
    const x = this[i]
    const y = this[i + 1]
    const s = Math.sin(angle)
    const c = Math.cos(angle)

    this[i] = c * x - s * y
    this[i + 1] = s * x + c * y
  }

  normalise(i: number) {
    const x = this[i]
    const y = this[i + 1]
    const len = Math.sqrt(x ** 2 + y ** 2)
    if (len === 0) return

    const scale = 1 / len
    this[i] = x * scale
    this[i + 1] = y * scale
  }
}

// Note: min and max could be negative.
export function fillXBuckets(
  min: number,
  max: number,
  incrementSize: number,
  movers: Movers2
) {
  const buckets = createBuckets(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (let id = 0; id < movers.length; id += I.len) {
    if (!movers.visible(id)) {
      continue
    }

    const x = movers.posX(id) + pixelShift
    const w = movers.width(id)

    for (let c = x; c < x + w; c += incrementSize) {
      if (c >= min && c <= max) {
        const i = Math.floor(c / incrementSize)

        buckets[i].push(id)
      }
    }
  }

  assert(
    buckets.length === length,
    `Expected bucket length not to grow ${JSON.stringify(buckets)}`
  )
  return buckets
}
