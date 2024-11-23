import {Store} from '../store/store'
import {generateStars, transformStars} from './star-data'
import {GoType} from '../data-types/data-types'
import {Camera} from '../camera'
import {Mover} from '../store/mover/mover'
import {nextEntityId} from '../lib/cmp.ts'

export class Stars {
  id = nextEntityId()

  stars = generateStars(60)

  type = GoType.visual as const

  constructor(public store: Store) {}

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    const {width, height} = camera

    this.drawBackground(ctx, width, height)
    // ctx.clearRect(0, 0, width, height)

    const {id} = this.store.gameObjects.player

    const p = this.store.movers.get(id)
    if (!p) return

    this.drawStars(ctx, width, height, p)
  }

  drawBackground(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number,
  ) {
    ctx.fillStyle = `rgb(0, 0, 0)`
    ctx.fillRect(0, 0, pageWidth, pageHeight)
  }

  drawStars(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number,
    mover: Mover,
  ) {
    const {
      position: [x, y],
    } = mover

    const xPos = (x / 10000) % 10000
    const yPos = (y / 10000) % 10000

    for (const {
      v: [x, y],
      size,
      colour,
    } of transformStars(this.stars, [0.5, 0.5], [xPos, -yPos])) {
      const currentX = x * pageWidth
      const currentY = y * pageHeight

      ctx.beginPath()
      ctx.fillStyle = colour
      ctx.arc(currentX, currentY, size * 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  update(timeSince: number, camera: Camera): void {
    // this.starsYPosition = (this.starsYPosition + 0.00002 * (now - last)) % 1
  }
}
