import {Store} from '../store/store'
import {Drawable, Updatable} from '../data-types/data-types'

export class Stats implements Drawable, Updatable {
  fps: number[] = []
  private frameDurations: number[] = []

  constructor(private store: Store) {}

  calcStats() {
    const {
      gameObjects: {
        player: {
          m: {position, direction, velocity},
        },
      },
    } = this.store

    const str = (n: number) => n.toPrecision(4)

    return [
      `${this.getFps()} fps (${this.getAvFrame().toFixed(2)}ms/f)`,
      `pos (${str(position[0])}, ${str(position[1])})`,
      `dir (${direction[0].toFixed(2)}, ${direction[1].toFixed(2)})`,
      `vel (${velocity?.[0].toFixed(1) ?? 0}, ${
        velocity?.[1].toFixed(1) ?? 0
      })`,
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

  addFrameDuration(duration: number) {
    this.frameDurations.push(duration)

    if (this.frameDurations.length > 100) {
      this.frameDurations.shift()
    }
  }

  getAvFrame(): number {
    return (
      this.frameDurations.reduce((prev, curr) => {
        return prev + curr
      }, 0) / this.frameDurations.length
    )
  }
}
