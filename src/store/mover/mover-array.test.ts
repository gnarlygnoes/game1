import {makeMoversArray, MoverView} from './mover-array'
import {Vec2} from "./movers";

describe(makeMoversArray.name, () => {
  test('setting px and py', () => {
    const array = makeMoversArray(10)

    const view = new MoverView(array, 0)
    view.px = 10
    view.py = 10

    const {px, py} = view

    expect(px).toEqual(10)
    expect(py).toEqual(10)
  })
})

describe("Vec2 stuff", () => {
  test('make it', () => {
    const v = new Vec2(1, 1)

    expect(v.x).toEqual(1)
    expect(v.y).toEqual(1)

    v.x = 100
    expect(v.x).toEqual(100)
  })

  const n = 100_000
  test('perf', () => {
    const t = Date.now()

    const vecs: Vec2[] = []
    for (let i = 0; i < n; i++) {
      vecs.push(new Vec2(i, i))
    }
    console.log(`Time: ${Date.now() - t}ms`)

    expect(vecs.length).toEqual(n)
  })

  class Vec {
    constructor(public x: number, public y: number) {
    }
  }

  test('perf2', () => {
    const t = Date.now()

    const vecs: Vec[] = []
    for (let i = 0; i < n; i++) {
      vecs.push(new Vec(i, i))
    }
    console.log(`Time: ${Date.now() - t}ms`)

    expect(vecs.length).toEqual(n)
  })

  test('perf3', () => {
    const t = Date.now()

    const vecs: [number, number][] = []
    for (let i = 0; i < n; i++) {
      vecs.push([i, i])
    }
    console.log(`Time: ${Date.now() - t}ms`)

    expect(vecs.length).toEqual(n)
  })

  test('perf4', () => {
    const t = Date.now()
    const vecs = new Float32Array(n * 2)

    for (let i = 0; i < n; i++) {
      let n = i * 2
      vecs[n] = i;
      vecs[n+1] = i
    }
    console.log(`Time: ${Date.now() - t}ms`)
    expect(vecs.length).toEqual(n*2)

    console.log(vecs)
  })
})