import {Store} from '../store/store'
import {Drawable, Updatable} from '../data-types/data-types'

export class Stats implements Drawable, Updatable {
  fps: number[] = []

  constructor(private store: Store) {}

  calcStats() {
    const {
      gameObjects: {
        player: {
          m: {position, direction, thrust},
        },
      },
    } = this.store

    const str = (n: number) => n.toPrecision(4)

    return [
      `${this.getFps()} fps`,
      `pos (${str(position.x)}, ${str(position.y)})`,
      `dir (${str(direction.x)}, ${str(direction.y)})`,
      `acc (${str(thrust?.x ?? 0)}, ${str(thrust?.y ?? 0)})`,
    ]
  }

  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    ctx.font = '14px monospace'
    ctx.fillStyle = 'yellow'

    const height = 22

    this.calcStats().forEach((row, i) => {
      ctx.fillText(row, 8, height * (i + 1))
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
