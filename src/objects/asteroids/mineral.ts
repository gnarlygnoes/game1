import {Camera} from '../../camera'
import {chase} from '../chase'
import {GoType} from '../../data-types/data-types'
import {AsteroidBase} from './asteroid-base'
import {GO} from '../../store/game-objects'

export class Mineral extends AsteroidBase {
  type = GoType.pickup as const

  health = Infinity

  update(timeSince: number, camera: Camera) {
    chase(this.m, this.store.gameObjects.player.m.center, 2)
  }

  drawAsteroid(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const gradient = ctx.createRadialGradient(
      x,
      y,
      this.size / 20,
      x,
      y,
      this.size / 2
    )

    gradient.addColorStop(0, '#c59531')
    gradient.addColorStop(0.9, '#856635')

    ctx.fillStyle = gradient
    ctx.strokeStyle = '#8d6c24'
    ctx.lineWidth = 4

    ctx.beginPath()

    const first = this.points[0]
    ctx.moveTo(x + first[0], y + first[1])

    for (const p of this.points) {
      ctx.lineTo(x + p[0], y + p[1])
    }

    ctx.lineTo(x + first[0], y + first[1])

    ctx.stroke()
    ctx.fill()
  }

  hit(other: GO) {
    if (other.type === GoType.player) {
      this.terminate()
    }
  }
}
