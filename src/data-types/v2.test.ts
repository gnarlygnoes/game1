import {normaliseV2, v2, V2} from './v2'

describe('normaliseV2', () => {
  function len({x, y}: V2): number {
    return Math.sqrt(x ** 2 + y ** 2)
  }

  test('(1, 2)', () => {
    const v = normaliseV2(v2(1, 2))

    expect(len(v)).toBeCloseTo(1)
  })

  test('(0.5, 100)', () => {
    const v = normaliseV2(v2(0.5, 100))

    expect(len(v)).toBeCloseTo(1)
  })

  test('(-5, 10)', () => {
    const v = normaliseV2(v2(-5, 10))

    expect(len(v)).toBeCloseTo(1)
  })
})
