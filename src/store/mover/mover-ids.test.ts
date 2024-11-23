import {store2Ids, unPackIds} from './mover-ids'
import {describe, test} from 'node:test'
import expect from 'expect'

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

  test('22222221, 33333331', () => {
    expect(unPackIds(store2Ids(22222221, 33333331))).toEqual([
      22222221, 33333331,
    ])
  })

  test('88_222_221, 99_333_331', () => {
    expect(unPackIds(store2Ids(88_222_221, 99_333_331))).toEqual([
      88_222_221, 99_333_331,
    ])
  })

  test('222222211, 333333311 (this one fails)', () => {
    expect(unPackIds(store2Ids(222222211, 333333311))).not.toEqual([
      222222211, 333333311,
    ])
  })
})
