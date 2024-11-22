import {and, map, or, parse, untilS, word} from '../../lib/parser/parsers'
import {Parser} from '../../lib/parser/types'
import {V2} from '../../data-types/v2'

export type Transform = Matrix | Rotation

type Matrix = [a: number, b: number, c: number, d: number, e: number, f: number]
type Rotation = [angle: number, x: number, y: number]

export function parseTransform(text: string): Transform | null {
  return parse(pTransform, text)
}

const pMatrix: Parser<Transform> = map(
  and(word('matrix('), untilS(')')),
  res => {
    return res[1].split(' ').map(s => +s) as Matrix
  },
)

const pRotate: Parser<Transform> = map(
  and(word('rotate('), untilS(')')),
  res => {
    return res[1].split(' ').map(s => +s) as Rotation
  },
)

function applyTransform(v: V2[], transform: Transform) {
  if (transform.length === 3) {
    //
  } else {
    //
  }
}

export function applyMatrix(v: V2, matrix: Matrix): V2 {
  const [a, b, c, d, e, f] = matrix
  const [x, y] = v

  let x2 = a * x + c * y + e
  let y2 = b * x + d * y + f

  return [x2, y2]
}

const pTransform: Parser<Transform> = or(pMatrix, pRotate)
