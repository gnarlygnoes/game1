import {
  and,
  char,
  int,
  number,
  parse,
  takeCharWhile,
  uint,
  untilLineEnd,
  untilS,
  word,
} from './parsers'
import {Input} from './input'

describe('test built in parsers', () => {
  it('untilLineEnd', () => {
    const text = `asdfsdf&^HF JC\tasd !@\nasdf`

    const res = parse(untilLineEnd, text, {partial: true})

    expect(res).toBe(`asdfsdf&^HF JC\tasd !@`)
  })
})

describe('parse2', () => {
  it('not all code parsed', () => {
    const code = '123 fd3s'

    try {
      parse(number, code)
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})

describe('uint', () => {
  test('123', () => {
    expect(parse(uint, '123')).toEqual('123')
  })
  test('1009', () => {
    expect(parse(uint, '1009')).toEqual('1009')
  })
  test('0120', () => {
    expect(parse(uint, '0120abc', {partial: true})).toEqual('0120')
  })
})

describe('int', () => {
  test('123', () => {
    expect(parse(int, '123')).toEqual('123')
  })
  test('0120', () => {
    expect(parse(int, '0120abc', {partial: true})).toEqual('0120')
  })
  test('-123', () => {
    expect(parse(int, '-123')).toEqual('-123')
  })
  test('-0120', () => {
    expect(parse(int, '-0120abc', {partial: true})).toEqual('-0120')
  })
})

describe(untilS.name, () => {
  const input = new Input('abcdefghijklmnomg')
  const res = untilS('omg')(input)
  expect(res).toBeTruthy()
  expect(res).toEqual('abcdefghijklmn')
  expect(input.endOfInput()).toBeTruthy()
})

describe(and.name, () => {
  test('', () => {
    const out = parse(and(word('aaa'), word('baa')), 'aaabaa')
    expect(out).toBeTruthy()
  })
})

describe(takeCharWhile.name, () => {
  test('aaaax', () => {
    const out = parse(
      takeCharWhile(c => c !== 'x'),
      'aaaax',
      {partial: true},
    )
    expect(out).toBeTruthy()
    expect(out).toEqual('aaaa')
  })

  it('asdf fdf \n', () => {
    const out = parse(
      and(
        takeCharWhile(c => c !== '\n'),
        char('\n'),
      ),
      'asdf fdf \n',
      {partial: true},
    )

    expect(out).toEqual(['asdf fdf ', '\n'])
  })
})

describe('until2', () => {
  const a = 'abc.'
  test(a, () => {
    const res = parse(untilS('.'), a)

    expect(res).toEqual('abc')
  })
})
