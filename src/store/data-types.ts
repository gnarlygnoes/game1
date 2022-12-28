export interface V2 {
  x: number
  y: number
}

export function v2(x: number, y: number): V2 {
  return {x, y}
}

export interface Updatable {
  update(now: number, last: number): void
}

export interface Drawable {
  draw(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void
}

export interface GameObject extends Updatable, Drawable {}
