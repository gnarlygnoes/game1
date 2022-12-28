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
