import {and, map, or, parse, untilS, word} from '../../lib/parser/parsers'
import {Parser} from '../../lib/parser/types'
import {V2} from '../../data-types/v2'

// TODO: Consider not combining these types into one.
export type Transform = MatrixTransform | {angle: number; x: number; y: number}

type MatrixTransform = [number, number, number, number, number, number]

export function parseTransform(text: string): Transform | null {
  return parse(pTransform, text)
}

const pMatrix: Parser<Transform> = map(
  and(word('matrix('), untilS(')')),
  res => {
    return res[1].split(' ').map(s => +s) as MatrixTransform
  },
)

const pRotate: Parser<Transform> = map(
  and(word('rotate('), untilS(')')),
  res => {
    const [angle, x, y] = res[1].split(' ').map(s => +s)
    return {
      angle,
      x,
      y,
    }
  },
)

export function applyMatrix(v: V2, matrix: MatrixTransform): V2 {
  const [a, b, c, d, e, f] = matrix
  const [x, y] = v

  let x2 = a * x + c * y + e
  let y2 = b * x + d * y + f

  return [x2, y2]
}

const pTransform = or(pMatrix, pRotate)
