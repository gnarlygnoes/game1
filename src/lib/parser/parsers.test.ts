import {and, char, number, parse, takeWhile, until, until2, untilLineEnd} from './parsers'

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

describe('takeWhile', () => {
  it('asdf fdf \n', () => {
    const out = parse(
      and(
        takeWhile(c => c !== '\n'),
        char('\n')
      ),
      'asdf fdf' + ' \n'
    )

    expect(out).toEqual(['asdf fdf ', '\n'])
  })
})

describe('until2', () => {
  const a = 'abc.'
  test(a, () => {
    const res = parse(until2('.'), a)

    expect(res).toEqual('abc')
  })
})
