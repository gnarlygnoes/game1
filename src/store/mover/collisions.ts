import {Mover} from './mover'
import {V2, V2RO} from '../../data-types/v2'
import {assert, time, timeEnd} from '../../misc/util'
import {Store} from '../store'

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

  if (intersecting.length > 0) {
    const {id} = store.gameObjects.player

    if (intersecting.some(([a, b]) => a === id || b === id)) {
      store.gameObjects.player.reduceMovement()
    }

    // console.log(intersecting.map(([a, b]) => `(${a}, ${b})`).join(', '))
  }
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

export function bucketIntersection(xBuckets: number[][], yBuckets: number[][]) {
  xBuckets = xBuckets.filter(b => b.length > 1)
  yBuckets = yBuckets.filter(b => b.length > 1)

  const xSet = new Set<string>()

  for (const x of xBuckets) {
    for (const id of getAllPairsAsStrings(x)) {
      xSet.add(id)
    }
  }

  const set = new Set<string>()

  for (const y of yBuckets) {
    for (const id of getAllPairsAsStrings(y)) {
      if (xSet.has(id)) {
        set.add(id)
      }
    }
  }

  const pairs: V2[] = []

  for (const id of set.values()) {
    pairs.push(id.split('-').map(n => parseInt(n)) as V2)
  }

  return pairs
}

export function getAllPairs(ids: number[]): V2[] {
  const pairs: V2[] = []

  for (let i = 0; i < ids.length; i++) {
    const id1 = ids[i]
    for (let j = i + 1; j < ids.length; j++) {
      const id2 = ids[j]
      pairs.push([id1, id2])
    }
  }

  return pairs
}

export function getAllPairsAsStrings(ids: number[]) {
  const pairs: string[] = []

  for (let i = 0; i < ids.length; i++) {
    const id1 = ids[i]
    for (let j = i + 1; j < ids.length; j++) {
      const id2 = ids[j]

      pairs.push(`${id1}-${id2}`)
    }
  }

  return pairs
}

export function numDigits(n: number): number {
  return (Math.log10((n ^ (n >> 31)) - (n >> 31)) | 0) + 1
}

export function pairToFloat(a: number, b: number) {
  const n = 10 ** numDigits(b)

  return a + b / n
}

// export function floatToPair(f: number) {}

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

// TODO: Remove and update tests
export function createBuckets(
  min: number,
  max: number,
  incrementSize: number
): number[] {
  const diff = max - min
  return new Array(Math.ceil(diff / incrementSize)).fill(0)
}
