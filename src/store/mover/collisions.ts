import {Mover} from './mover'
import {V2RO} from '../../data-types/v2'
import {assert, time, timeEnd} from '../../misc/util'

const INCREMENT_SIZE = 4

export function detectCollisions(
  movers: Map<number, Mover>,
  [x1, y1]: V2RO,
  [x2, y2]: V2RO
) {
  time(detectCollisions.name)

  const xBuckets = fillXBuckets(x1, x2, INCREMENT_SIZE, movers)
  const yBuckets = fillYBuckets(y1, y2, INCREMENT_SIZE, movers)

  timeEnd(detectCollisions.name)

  // console.log(bucketIntersection(xBuckets, yBuckets))
  // console.log(xBuckets, yBuckets)
  // console.log(xBuckets, yBuckets, getPossibleCollisions(yBuckets))
  // console.log(getPossibleCollisions(yBuckets))
}

// Note: min and max could be negative.
export function fillXBuckets(
  min: number,
  max: number,
  incrementSize: number,
  movers: Map<number, Mover>
) {
  const buckets = createBuckets2(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (const {
    position,
    size: [w],
    id,
  } of movers.values()) {
    const x = position[0] + pixelShift

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

// Note: min and max could be negative.
export function fillYBuckets(
  min: number,
  max: number,
  incrementSize: number,
  movers: Map<number, Mover>
) {
  const buckets = createBuckets2(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (const {position, size, id} of movers.values()) {
    const h = size[1]
    const y = position[1] + pixelShift

    for (let c = y; c < y + h; c += incrementSize) {
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

function bucketIntersection(xBuckets: number[][], yBuckets: number[][]) {
  xBuckets = xBuckets.filter(b => b.length > 1)
  yBuckets = yBuckets.filter(b => b.length > 1)

  return [xBuckets, yBuckets]

  // const set = new Map<number, number[]>()
  //
  // for (const x of xBuckets) {
  //   // yBuckets.some()
  //
  //
  // }
}

export function createBuckets2(
  min: number,
  max: number,
  incrementSize: number
): number[][] {
  const diff = max - min

  const len = Math.ceil(diff / incrementSize)
  const a: number[][] = []

  for (let i = 0; i < len; i++) {
    a.push([])
  }

  return a
}

// function getPossibleCollisions(buckets: number[][]): Set<number> {
//   const set = new Set<number>()
//
//   for (const b of buckets) {
//     if (b.length > 1) {
//       for (const id of b) {
//         set.add(id)
//       }
//     }
//   }
//
//   return set
// }

// function getPossibleCollisions(buckets: number[][]): number[][] {
//   return buckets.filter(b => b.length > 1)
// }

// TODO: Remove and update tests
export function createBuckets(
  min: number,
  max: number,
  incrementSize: number
): number[] {
  const diff = max - min
  return new Array(Math.ceil(diff / incrementSize)).fill(0)
}
