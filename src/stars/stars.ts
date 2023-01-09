import {Store} from '../store/store'
import {generateStars, transformStars} from './star-data'
import {GameObject} from '../data-types/data-types'
import {Mover} from '../store/mover'
import {reverseV2} from '../data-types/v2'

export class Stars implements GameObject {
  stars = generateStars(100)

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
      position: [x, y],
    } = mover

    const xPos = (x / 10000) % 10000
    const yPos = (y / 10000) % 10000

    // const angle = -mover.getAngle()

    for (const {
      v: [x, y],
      size,
      colour,
    } of transformStars(this.stars, [0.5, 0.5], [xPos, -yPos], 0)) {
      const currentX = x * pageWidth
      const currentY = y * pageHeight

      ctx.beginPath()
      ctx.fillStyle = colour
      ctx.arc(currentX, currentY, size * 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  update(timeSince: number): void {
    // this.starsYPosition = (this.starsYPosition + 0.00002 * (now - last)) % 1
  }
}
