import {Mover} from './mover'
import {V2, V2RO} from '../../data-types/v2'
import {assert, time, timeEnd} from '../../misc/util'
import type {Store} from '../store'
import {GoType} from '../../data-types/data-types'
import {store2Ids, unPackIds} from './mover-ids'

const INCREMENT_SIZE = 10

export function detectCollisions(
  store: Store,
  movers: Map<number, Mover>,
  [x1, y1]: V2RO,
  [x2, y2]: V2RO
) {
  time(detectCollisions.name)

  const xBuckets = fillXBuckets(x1, x2, INCREMENT_SIZE, movers)
  const yBuckets = fillYBuckets(y1, y2, INCREMENT_SIZE, movers)

  const intersecting = bucketIntersection(xBuckets, yBuckets)

  timeEnd(detectCollisions.name)

  const {gameObjects} = store

  for (const [idA, idB] of intersecting) {
    const a = gameObjects.objects.get(idA)
    const b = gameObjects.objects.get(idB)

    if (a && b) {
      if (a.type === GoType.weapon) {
        a.hit(b)
      } else if (b.type === GoType.weapon) {
        b.hit(a)
      }
    }
  }
}

// Note: min and max could be negative.
export function fillXBuckets(
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
    id,
    visible,
  } of movers.values()) {
    if (!visible) continue

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
  const buckets = createBuckets(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (const {position, size, id, visible} of movers.values()) {
    if (!visible) continue

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

export function bucketIntersection(xBuckets: number[][], yBuckets: number[][]) {
  xBuckets = xBuckets.filter(b => b.length > 1)
  yBuckets = yBuckets.filter(b => b.length > 1)

  const xSet = new Set<number>()

  for (const x of xBuckets) {
    for (const id of getAllPairsAsIds(x)) {
      xSet.add(id)
    }
  }

  const set = new Set<number>()

  for (const y of yBuckets) {
    for (const id of getAllPairsAsIds(y)) {
      if (xSet.has(id)) {
        set.add(id)
      }
    }
  }

  const pairs: V2[] = []

  for (const id of set.values()) {
    pairs.push(unPackIds(id))
  }

  return pairs
}

// export function getAllPairs(ids: number[]): V2[] {
//   const pairs: V2[] = []
//
//   for (let i = 0; i < ids.length; i++) {
//     const id1 = ids[i]
//     for (let j = i + 1; j < ids.length; j++) {
//       const id2 = ids[j]
//       pairs.push([id1, id2])
//     }
//   }
//
//   return pairs
// }
//
// export function getAllPairsAsStrings(ids: number[]): string[] {
//   const pairs: string[] = []
//
//   for (let i = 0; i < ids.length; i++) {
//     const id1 = ids[i]
//     for (let j = i + 1; j < ids.length; j++) {
//       const id2 = ids[j]
//
//       pairs.push(`${id1}-${id2}`)
//     }
//   }
//
//   return pairs
// }

export function getAllPairsAsIds(ids: number[]): number[] {
  const pairs: number[] = []

  for (let i = 0; i < ids.length; i++) {
    const id1 = ids[i]
    for (let j = i + 1; j < ids.length; j++) {
      const id2 = ids[j]

      pairs.push(store2Ids(id1, id2))
    }
  }

  return pairs
}

export function createBuckets(
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
