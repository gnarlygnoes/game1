import {parseSvg} from './parse-svg'

describe(parseSvg.name, () => {
  test('basic', () => {
    const res = parseSvg('<svg width="100"/>')
    console.log(res)
    // parseSvg('<svg width="100"></svg>')
  })
})
