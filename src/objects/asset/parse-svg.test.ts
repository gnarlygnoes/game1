import {parseSvg} from './parse-svg'
import * as path from 'node:path'
import {readFileSync} from 'fs'

describe(parseSvg.name, () => {
  test('basic', () => {
    const res = parseSvg(
      '<svg width="254" height="456" viewBox="0 0 254 456" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M108 409H144L148.5 451H102.64L108 409Z" fill="#777777"/></svg>',
    )
    expect(res).toBeTruthy()
  })

  test('ship1', () => {
    const ship = path.resolve('resources', 'ship1.svg')
    const text = readFileSync(ship, {encoding: 'utf8'})
    const res = parseSvg(text)

    expect(res).toBeTruthy()
  })
})
