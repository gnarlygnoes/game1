import {Store} from '../store/store'
import {Drawable, GoType, Updatable} from '../data-types/data-types'
import {Camera} from '../camera'
import {nextEntityId} from '../lib/cmp.ts'

export class Stats implements Drawable, Updatable {
  id = nextEntityId()

  type = GoType.visual as const

  fps: number[] = []
  private frameDurations: number[] = []

  constructor(private store: Store) {}

  calcStats() {
    const {
      movers,
      gameObjects: {
        player: {id},
      },
    } = this.store

    const m = movers.get(id)

    if (!m) return

    const {position, direction, velocity} = m

    const str = (n: number) => n.toPrecision(4)

    return [
      `${this.getFps()} fps (${this.getAvFrame().toPrecision(2)}ms/f)`,
      `pos (${str(position[0])}, ${str(position[1])})`,
      `dir (${direction[0].toFixed(2)}, ${direction[1].toFixed(2)})`,
      `vel (${velocity?.[0].toFixed(1) ?? 0}, ${
        velocity?.[1].toFixed(1) ?? 0
      })`,
    ]
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.font = '14px monospace'
    ctx.fillStyle = 'yellow'

    const height = 22

    this.calcStats()?.forEach((statText, i) => {
      ctx.fillText(statText, 8, height * (i + 1))
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
