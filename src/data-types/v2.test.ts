import {V2} from './v2'

describe('normaliseV2', () => {
  function len([x, y]: V2): number {
    return Math.sqrt(x ** 2 + y ** 2)
  }

  function typed(n: number) {
    let sum = 0

    for (let i = 0; i < n; i++) {
      const a = new Float64Array(2)
      a[0] = 100
      a[1] = 12

      const [x, y] = a
      sum += x
      sum += y
    }

    return sum
  }

  function typed2(n: number) {
    let sum = 0

    const len = 2 * n
    const a = new Float64Array(len)

    for (let i = 0; i < len - 1; i++) {
      if (i % 2 === 0) {
        a[i] = 100
      } else {
        a[i + 1] = 12
      }

      sum += a[i]
      sum += a[i + 1]
    }

    return sum
  }

  function normal(n: number) {
    let sum = 0

    const normy = []

    for (let i = 0; i < n; i++) {
      const a: number[] = [100, 12]
      // a.push(100)
      // a.push(12)

      const [x, y] = a
      sum += x
      sum += y

      normy.push(a)
    }

    return sum
  }

  test('array speed', () => {
    console.time('normal')
    let r1 = normal(10_000_000)
    console.timeEnd('normal')
    console.log(r1)

    console.time('typed')
    let r2 = typed(10_000_000)
    console.timeEnd('typed')
    console.log(r2)

    console.time('typed')
    let r3 = typed2(10_000_000)
    console.timeEnd('typed')
    console.log(r3)
  })

  test('(1, 2)', () => {
    const v = V2.normalise([1, 2])

    expect(len(v)).toBeCloseTo(1)
  })

  test('(0.5, 100)', () => {
    const v = V2.normalise([0.5, 100])

    expect(len(v)).toBeCloseTo(1)
  })

  test('(-5, 10)', () => {
    const v = V2.normalise([-5, 10])

    expect(len(v)).toBeCloseTo(1)
  })
})
