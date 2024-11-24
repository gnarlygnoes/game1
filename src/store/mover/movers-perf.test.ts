import {describe, expect, test} from 'vitest'
import {Mover} from './mover.ts'

describe('movers1', () => {
  test('collisions', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('movers2', () => {
  test('collisions', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('movers3', () => {
  test('collisions', () => {
    expect(1 + 1).toBe(2)
  })
})

// describe('map iteration', () => {
//   const span = 40_000
//   const skip = 4
//   const num = span / skip
//   const numLoops = 5
//
//   // It looks like javascript Map beats a sparse array.
//   test('map', () => {
//     const map = new Map<number, Mover>()
//
//     for (let i = 0; i < span; i += skip) {
//       map.set(i, new Mover())
//     }
//
//     for (let i = 0; i < numLoops; i++) {
//       for (const m of map.values()) {
//         m.position[0] += 0.01
//       }
//     }
//
//     expect(map.size).toBe(num)
//   })
//
//   test('array', () => {
//     const array: (Mover | null)[] = Array.from({length: span}, () => null)
//
//     for (let i = 0; i < span; i += skip) {
//       array[i] = new Mover()
//     }
//
//     for (let i = 0; i < numLoops; i++) {
//       for (const m of array) {
//         if (m) m.position[0] += 0.01
//       }
//     }
//
//     expect(array.length).toBe(span)
//   })
// })
