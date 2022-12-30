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

export function scaleV2({x, y}: V2, scale: number): V2 {
  return {x: x * scale, y: y * scale}
}

export function rotateV2({x, y}: V2, angle: number): V2 {
  const s = Math.sin(angle)
  const c = Math.cos(angle)

  return v2(c * x - s * y, s * x + c * y)
}
