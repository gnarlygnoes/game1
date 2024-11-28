import {describe, expect, test} from 'vitest'
import {Mover, updateMover} from './mover.ts'
import {CmpMap} from '../../lib/cmp.ts'
import {Random} from '../../lib/random.ts'
import {Store} from '../store.ts'
import {I, Movers3} from './movers3.ts'

const numAsteroids = 10000
const d = 9000
const numUpdateLoops = 1000

describe('movers update loop', () => {
  test('CmpMap', () => {
    const rand = new Random(0)

    const map = new CmpMap<Mover>()
    const store = new Store(1000, 1000)

    for (let i = 0; i < numAsteroids; i++) {
      const size = 5 + rand.next() * 60
      const x = -(d / 2) + rand.next() * d
      const y = -(d / 2) + rand.next() * d
      const m = new Mover([x, y], [size, size])
      m.id = i
      map.set(i, m)
    }

    for (let i = 0; i < numUpdateLoops; i++) {
      for (const m of map) {
        updateMover(m, 16, store.camera)
      }
    }

    expect(1 + 1).toBe(2)
  })

  test('Movers3', () => {
    const rand = new Random(0)

    const map = new Movers3()
    const store = new Store(1000, 1000)

    for (let i = 0; i < numAsteroids; i++) {
      const size = 5 + rand.next() * 60
      const x = -(d / 2) + rand.next() * d
      const y = -(d / 2) + rand.next() * d
      const m = new Mover([x, y], [size, size])
      m.id = i
      map.setFromMover(m)
    }

    for (let i = 0; i < numUpdateLoops; i++) {
      for (let id = 0; id < map.length; id += I.len) {
        map.updateMover(id, 16, store.camera)
      }
    }

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
