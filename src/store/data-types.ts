export interface V2 {
  x: number
  y: number
}

export function v2(x: number, y: number): V2 {
  return {x, y}
}
