import {Mover} from './mover'
import {V2RO} from '../../data-types/v2'
import {assert, time, timeEnd} from '../../misc/util'

const INCREMENT_SIZE = 100

export function detectCollisions(
  movers: Map<number, Mover>,
  [x1, y1]: V2RO,
  [x2, y2]: V2RO
) {
  time(detectCollisions.name)
  const b = fillBuckets(x1, x2, INCREMENT_SIZE, movers)
  timeEnd(detectCollisions.name)

  // console.log(b)
}

// Note: min and max could be negative.
export function fillBuckets(
  min: number,
  max: number,
  incrementSize: number,
  movers: Map<number, Mover>
) {
  const buckets = createBuckets(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (const {
    position,
    size: [w],
  } of movers.values()) {
    const x = position[0] + pixelShift

    for (let c = x; c < x + w; c += incrementSize) {
      if (c >= min && c <= max) {
        const i = Math.floor(c / incrementSize)

        buckets[i]++
      }
    }
  }

  assert(
    buckets.length === length,
    `Expected bucket length not to grow ${JSON.stringify(buckets)}`
  )

  return buckets
}

export function createBuckets(
  min: number,
  max: number,
  incrementSize: number
): number[] {
  const diff = max - min
  return new Array(Math.ceil(diff / incrementSize)).fill(0)
}
