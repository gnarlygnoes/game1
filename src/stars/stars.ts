import './stars.css'
import {Store} from '../store/store'
import {generateStars} from './star-data'
import {Drawable, GameObject} from '../store/data-types'

export class Stars implements GameObject {
  stars = generateStars()

  starsYPosition = 0

  constructor(public store: Store) {}

  draw(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ) {
    this.drawBackground(context, pageWidth, pageHeight)

    this.drawStars(context, pageWidth, pageHeight, this.starsYPosition)
  }

  drawBackground(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ) {
    context.fillStyle = `rgb(0, 0, 0)`
    context.fillRect(0, 0, pageWidth, pageHeight)
  }

  drawStars(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number,
    starsYPosition: number
  ) {
    for (const {x, y, size, colour} of this.stars) {
      const currentY = (y + starsYPosition) % 1

      context.beginPath()
      context.fillStyle = colour
      context.arc(
        x * pageWidth,
        currentY * pageHeight,
        size * 5,
        0,
        Math.PI * 2
      )
      context.fill()
    }
  }

  update(now: number, last: number): void {
    this.starsYPosition = (this.starsYPosition + 0.00002 * (now - last)) % 1
  }
}
