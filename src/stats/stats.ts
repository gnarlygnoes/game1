import {Store} from '../store/store'
import {Drawable, Updatable} from '../data-types/data-types'
import {AccelerationType} from '../store/mover'

export class Stats implements Drawable, Updatable {
  fps: number[] = []

  constructor(private store: Store) {}

  calcStats() {
    const {
      gameObjects: {
        player: {
          m: {position, direction, acceleration},
        },
      },
    } = this.store

    const a = acceleration.get(AccelerationType.thrust)

    const str = (n: number) => n.toPrecision(4)

    return [
      `${this.getFps()} fps`,
      `position x: ${str(position.x)}, y: ${str(position.y)}`,
      `direction x: ${str(direction.x)}, y: ${str(direction.y)}`,
      `acceleration x: ${str(a?.x ?? 0)}, y: ${str(a?.y ?? 0)}`,
    ]
  }

  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    ctx.font = '16px sans'
    ctx.fillStyle = 'yellow'

    const height = 24

    this.calcStats().forEach((row, i) => {
      ctx.fillText(row, 10, height * (i + 1))
    })
  }

  update(timeSince: number): void {
    this.fps.push(timeSince)

    if (this.fps.length > 10) {
      this.fps.shift()
    }
  }

  getFps(): number {
    const av =
      this.fps.reduce((prev, curr) => {
        return prev + curr
      }, 0) / this.fps.length

    return Math.min(Math.round(1000 / av), 60)
  }
}
