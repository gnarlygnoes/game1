describe('Compare object construction', () => {
  const n = 1000_000

  test('tuple', () => {
    console.time('tuple')

    const array: [number, number][] = []

    let x = 0
    let y = 0

    for (let i = 0; i < n; i++) {
      const v: [number, number] = [i, i + 1]

      array.push(v)

      x = v[0]
      y = v[1]
    }

    console.timeEnd('tuple')

    expect(array.length).toBe(n)
  })

  test('object', () => {
    console.time('object')

    const array: {x: number; y: number}[] = []

    let x = 0
    let y = 0

    for (let i = 0; i < n; i++) {
      const v = {x: i, y: i + 1}

      array.push(v)

      x = v.x
      y = v.y
    }

    console.timeEnd('object')

    expect(array.length).toBe(n)
  })

  test('class', () => {
    console.time('class')

    class V2 {
      constructor(public x: number, public y: number) {}
    }

    const array: V2[] = []
    let x = 0
    let y = 0

    for (let i = 0; i < n; i++) {
      const v = new V2(i, i + 1)

      array.push(v)

      x = v.x
      y = v.y
    }

    console.timeEnd('class')

    expect(array.length).toBe(n)
  })
})
