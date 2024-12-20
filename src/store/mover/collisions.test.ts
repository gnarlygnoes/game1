import {Mover} from './mover'
import {
  bucketIntersection,
  detectCollisions,
  fillXBuckets,
  getAllPairsAsIds,
} from './collisions'
import {Store} from '../store'
import {store2Ids} from './mover-ids'
import {describe, expect, test} from 'vitest'
import {CmpMap} from '../../lib/cmp.ts'

function makeCmp() {
  return new CmpMap<Mover>()
}

describe(detectCollisions.name, () => {
  const movers = makeCmp()

  movers.set(0, new Mover([20, 20]))
  movers.set(0, new Mover([20, 20]))

  test('simple', () => {
    detectCollisions(new Store(0, 0), movers, [0, 0], [1000, 600])

    expect(true).toBe(true)
  })
})

describe(fillXBuckets.name, () => {
  test('2 colliding boxes', () => {
    const movers = makeCmp()

    const m1 = new Mover([20, 20], [20, 20])
    const m2 = new Mover([30, 30], [20, 20])

    movers.set(m1.id, m1)
    movers.set(m2.id, m2)

    const b = fillXBuckets(0, 1000, 100, movers)

    expect(b[0].length).toEqual(2)
  })

  test('2 boxes', () => {
    const movers = makeCmp()

    let id = 0

    movers.set(id++, new Mover([0, 0], [40, 40]))
    movers.set(id++, new Mover([124.5, 40], [20, 20]))

    const b = fillXBuckets(-390.5, 390.5, 100, movers)

    console.log(b)

    // expect(b[0]).toEqual(2)
  })
})

describe(getAllPairsAsIds.name, () => {
  test('[1, 2]', () => {
    expect(getAllPairsAsIds([1, 2])).toEqual([store2Ids(1, 2)])
  })

  test('[1, 2, 3, 4, 5]', () => {
    expect(getAllPairsAsIds([1, 2, 3, 4, 5])).toEqual([
      store2Ids(1, 2),
      store2Ids(1, 3),
      store2Ids(1, 4),
      store2Ids(1, 5),
      store2Ids(2, 3),
      store2Ids(2, 4),
      store2Ids(2, 5),
      store2Ids(3, 4),
      store2Ids(3, 5),
      store2Ids(4, 5),
    ])
  })
})

describe(bucketIntersection.name, () => {
  test('simple', () => {
    const result = bucketIntersection(
      [
        [1, 2],
        [2, 3],
      ],
      [[3, 2]],
    )

    expect(result).toEqual([])
  })

  test('harder', () => {
    const result = bucketIntersection(
      [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [2, 3, 4],
        [2, 3],
      ],
      [[3, 2]],
    )

    expect(result).toEqual([])
  })
})
