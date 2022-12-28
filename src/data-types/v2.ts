export interface V2 {
  x: number
  y: number
}

export function v2(x: number, y: number): V2 {
  return {x, y}
}

export function normaliseV2({x, y}: V2): V2 {
  const len = Math.sqrt(x ** 2 + y ** 2)

  const scale = 1 / len

  return {
    x: x * scale,
    y: y * scale,
  }
}

export function addV2(a: V2, b: V2): V2 {
  return {x: a.x + b.x, y: a.y + b.y}
}

export function reverseV2({x, y}: V2): V2 {
  return {x: -x, y: -y}
}
