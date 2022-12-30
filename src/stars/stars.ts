import {Store} from '../store/store'
import {generateStars, rotateStars, transformStars} from './star-data'
import {GameObject} from '../data-types/data-types'
import {Mover} from '../store/mover'
import {reverseV2} from '../data-types/v2'

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
      position: {x, y},
    } = mover

    const xPos = (x / 1000) % 1000
    const yPos = (y / 1000) % 1000

    const angle = mover.getAngle()

    for (const {
      v: {x, y},
      size,
      colour,
    } of transformStars(
      this.stars,
      {x: 0.5, y: 0.5},
      reverseV2({x: xPos, y: yPos}),
      angle
    )) {
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
