import {Cmp, Cmp2, Id} from './cmp'

describe('Cmp', () => {
  test('put stuff in', () => {
    type Pos = {x: number; y: number}
    let id: Id = 0

    const cmp = new Cmp<Pos>()
    cmp.set(id, {x: 1, y: 1})

    const a = Array.from(cmp)
    expect(a.length).toBe(1)
  })
})

describe('Cmp2', () => {
  test('put stuff in', () => {
    type Pos = {x: number; y: number; deleted?: true}

    const cmp = new Cmp2<Pos>({x: 0, y: 0})
    cmp.set(0, {x: 1, y: 1})
    cmp.set(1, {x: 2, y: 2})

    const a = Array.from(cmp)
    expect(a.length).toBe(2)

    cmp.delete(0)

    const b = Array.from(cmp)
    expect(b.length).toBe(1)
  })
})
