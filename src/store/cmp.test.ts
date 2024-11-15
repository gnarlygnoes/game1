import {Cmp, Id} from './cmp'

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
