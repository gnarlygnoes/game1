import {Mover} from './mover'
import {V2RO} from '../../data-types/v2'

const INCREMENT_SIZE = 100

export function detectCollisions(
  movers: Map<number, Mover>,
  [x1, y1]: V2RO,
  [x2, y2]: V2RO
) {
  const b = fillBuckets(x1, x2, INCREMENT_SIZE, movers)

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
        const i = Math.round(c / incrementSize)

        buckets[i]++
      }
    }
  }

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
