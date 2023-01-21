import {Mover} from './mover'
import {
  bucketIntersection,
  createBuckets,
  detectCollisions,
  fillXBuckets,
  getAllPairs,
  getAllPairsAsStrings,
  numDigits,
  pairToFloat,
} from './collisions'

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

    const m1 = new Mover([20, 20], [20, 20])
    const m2 = new Mover([30, 30], [20, 20])

    movers.set(m1.id, m1)
    movers.set(m2.id, m2)

    const b = fillXBuckets(0, 1000, 100, movers)

    expect(b[0]).toEqual([2, 3])
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

describe(getAllPairs.name, () => {
  test('[1, 2]', () => {
    expect(getAllPairs([1, 2])).toEqual([[1, 2]])
  })

  test('[1, 2, 3, 4, 5]', () => {
    expect(getAllPairs([1, 2, 3, 4, 5])).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [4, 5],
    ])
  })
})

describe(getAllPairsAsStrings.name, () => {
  test('[1, 2]', () => {
    expect(getAllPairsAsStrings([1, 2])).toEqual(['1-2'])
  })

  test('[1, 2, 3, 4, 5]', () => {
    expect(getAllPairsAsStrings([1, 2, 3, 4, 5])).toEqual([
      '1-2',
      '1-3',
      '1-4',
      '1-5',
      '2-3',
      '2-4',
      '2-5',
      '3-4',
      '3-5',
      '4-5',
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
      [[3, 2]]
    )

    expect(result).toEqual([[2, 3]])
  })

  test('harder', () => {
    const result = bucketIntersection(
      [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [2, 3, 4],
        [2, 3],
      ],
      [[3, 2]]
    )

    expect(result).toEqual([[2, 3]])
  })
})

describe(numDigits.name, () => {
  test('124', () => {
    expect(numDigits(124)).toEqual(3)
  })

  test('0.234', () => {
    expect(numDigits(0.234)).toEqual(3)
  })
})

describe(pairToFloat.name, () => {
  test('12, 24', () => {
    expect(pairToFloat(12, 24)).toEqual(12.24)
  })
})

//

//

//
