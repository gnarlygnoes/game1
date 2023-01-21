import {Mover} from './mover'
import {createBuckets, detectCollisions, fillXBuckets} from './collisions'

describe(detectCollisions.name, () => {
  const movers = new Map<number, Mover>()

  movers.set(0, new Mover([20, 20]))
  movers.set(0, new Mover([20, 20]))

  test('simple', () => {
    detectCollisions(movers, [0, 0], [1000, 600])

    expect(true).toBe(true)
  })
})

describe(createBuckets.name, () => {
  test('make some zeroed buckets', () => {
    const buckets = createBuckets(0, 1000, 100)

    expect(buckets).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  test('make some zeroed buckets2', () => {
    const buckets = createBuckets(-100, 1000, 100)

    expect(buckets).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})

describe(fillXBuckets.name, () => {
  test('2 colliding boxes', () => {
    const movers = new Map<number, Mover>()

    let id = 0

    movers.set(id++, new Mover([20, 20], [20, 20]))
    movers.set(id++, new Mover([30, 30], [20, 20]))

    const b = fillXBuckets(0, 1000, 100, movers)

    expect(b[0]).toEqual(2)
  })

  test('2 boxes', () => {
    const movers = new Map<number, Mover>()

    let id = 0

    movers.set(id++, new Mover([0, 0], [40, 40]))
    movers.set(id++, new Mover([124.5, 40], [20, 20]))

    const b = fillXBuckets(-390.5, 390.5, 100, movers)

    console.log(b)

    // expect(b[0]).toEqual(2)
  })
})
