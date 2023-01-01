export interface Updatable {
  update(timeSince: number): void
}

export interface Drawable {
  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void
}

export interface GameObject extends Updatable, Drawable {}
