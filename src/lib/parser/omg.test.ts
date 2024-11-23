import {describe, test} from 'node:test'
import * as assert from 'node:assert'
import {parse, untilLineEnd} from './parsers'

describe('wow', () => {
  test('some nums', () => {
    assert.strictEqual(1, 1)
    assert.deepEqual({a: 4}, {a: 4})
  })

  test('do I need types?', () => {
    const text = `asdfsdf&^HF JC\tasd !@\nasdf`

    const res = parse(untilLineEnd, text, {partial: true})

    assert.deepEqual(res, `asdfsdf&^HF JC\tasd !@`)
  })
})
