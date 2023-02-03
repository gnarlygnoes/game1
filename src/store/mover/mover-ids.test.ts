import {store2Ids, unPackIds} from './mover-ids'

describe(store2Ids.name, () => {
  test('123, 321', () => {
    expect(unPackIds(store2Ids(123, 321))).toEqual([123, 321])
  })

  test('11111, 22222', () => {
    expect(unPackIds(store2Ids(11111, 22222))).toEqual([11111, 22222])
  })

  test('222222, 333333', () => {
    expect(unPackIds(store2Ids(222222, 333333))).toEqual([222222, 333333])
  })

  test('2222222, 3333333', () => {
    expect(unPackIds(store2Ids(2222222, 3333333))).toEqual([2222222, 3333333])
  })
})
