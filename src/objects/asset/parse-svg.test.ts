import {parseSvg} from './parse-svg'

describe(parseSvg.name, () => {
  test('basic', () => {
    parseSvg('<svg width="100"/>')
    // parseSvg('<svg width="100"></svg>')
  })
})
