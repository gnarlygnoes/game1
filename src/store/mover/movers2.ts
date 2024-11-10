import {createBuckets} from './collisions'
import {assert} from '../../misc/util'

const numMovers = 2000
// const sizeOfMover = 14

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
    if (!movers[id + I.visible]) {
      continue
    }

    const x = movers[id] + pixelShift
    const w = movers[id + I.size]

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
