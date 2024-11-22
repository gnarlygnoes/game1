import {parseTransform} from './transform'

describe('parseTransform', () => {
  test('matrix(-1 0 0 1 40 176)', () => {
    const res = parseTransform('matrix(-1 0 0 1 40 176)')
    expect(res).toBeTruthy()
    expect(res).toEqual([-1, 0, 0, 1, 40, 176])
  })

  test('rotate(30.4709 223.042 180)', () => {
    const res = parseTransform('rotate(30.4709 223.042 180)')
    expect(res).toBeTruthy()
    expect(res).toEqual([30.4709, 223.042, 180])
  })
})
