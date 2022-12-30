import {Store} from '../store/store'
import {Drawable} from '../data-types/data-types'
import {AccelerationType} from '../store/mover'

export class Stats implements Drawable {
  constructor(private store: Store) {}

  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    const {
      gameObjects: {
        player: {
          m: {position, direction, acceleration},
        },
      },
    } = this.store

    ctx.font = '16px sans'
    ctx.fillStyle = 'yellow'
    ctx.fillText(
      `position x: ${position.x.toPrecision(5)}, y: ${position.y.toPrecision(
        5
      )}`,
      10,
      24
    )
    ctx.fillText(
      `direction x: ${direction.x.toPrecision(5)}, y: ${direction.y.toPrecision(
        5
      )}`,
      10,
      48
    )

    const a = acceleration.get(AccelerationType.thrust)

    ctx.fillText(
      `acceleration x: ${a?.x.toPrecision(5) ?? 0}, y: ${
        a?.y.toPrecision(5) ?? 0
      }`,
      10,
      72
    )
  }
}
