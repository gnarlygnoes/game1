import {Store} from '../store/store'
import {generateStars} from './star-data'
import {GameObject} from '../data-types/data-types'
import {Mover} from '../store/mover'

export class Stars implements GameObject {
  stars = generateStars()

  constructor(public store: Store) {}

  draw(ctx: CanvasRenderingContext2D, pageWidth: number, pageHeight: number) {
    this.drawBackground(ctx, pageWidth, pageHeight)

    this.drawStars(ctx, pageWidth, pageHeight, this.store.gameObjects.player.m)
  }

  drawBackground(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ) {
    ctx.fillStyle = `rgb(0, 0, 0)`
    ctx.fillRect(0, 0, pageWidth, pageHeight)
  }

  drawStars(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number,
    mover: Mover
  ) {
    const {
      position: {x: xPos, y: yPos},
    } = mover

    const angle = mover.getAngle()

    const w = pageWidth / 2
    const h = pageHeight / 2

    ctx.translate(w, h)
    ctx.rotate(-angle)

    for (const {x, y, size, colour} of this.stars) {
      const currentX = (x + xPos / 1000) % 1
      const currentY = (y + yPos / 1000) % 1

      ctx.beginPath()
      ctx.fillStyle = colour
      ctx.arc(
        -w + currentX * pageWidth * 2,
        -h + currentY * pageHeight * 2,
        size * 5,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }
    ctx.rotate(angle)
    ctx.translate(-w, -h)
  }

  update(now: number, last: number): void {
    // this.starsYPosition = (this.starsYPosition + 0.00002 * (now - last)) % 1
  }
}
