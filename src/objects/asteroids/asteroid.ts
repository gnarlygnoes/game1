import {GameObject} from '../../data-types/data-types'
import {Mover} from '../../store/mover'
import {rotateV2, scaleV2, V2, v2} from '../../data-types/v2'
import {Rand} from '../../misc/random'

const numPoints = 13

export class Asteroid implements GameObject {
  p: Mover

  points: V2[] = []

  constructor(public size = 20, pos: V2) {
    this.p = new Mover(pos)

    for (let i = 0; i < numPoints; i++) {
      const r1 = Rand.next() - 0.5
      const r2 = Rand.next() - 0.5

      this.points.push(
        scaleV2(
          rotateV2(
            v2(r1 * 0.25, 1 + r2 * 0.25),
            ((2 * Math.PI) / numPoints) * i
          ),
          size
        )
      )
    }

    console.log(this.points)
  }

  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    const {
      position: {x, y},
    } = this.p

    ctx.beginPath()

    const gradient = ctx.createRadialGradient(
      x,
      y,
      this.size / 10,
      x,
      y,
      this.size
    )

    gradient.addColorStop(0, '#7e7e7e')
    gradient.addColorStop(0.9, '#5d5d5d')

    ctx.fillStyle = gradient
    ctx.strokeStyle = '#5d5d5d'
    ctx.lineWidth = 4

    const first = this.points[0]
    ctx.moveTo(x + first.x, y + first.y)

    for (const p of this.points) {
      ctx.lineTo(x + p.x, y + p.y)
    }

    ctx.lineTo(x + first.x, y + first.y)

    ctx.stroke()
    ctx.fill()
  }

  update(timeSince: number): void {}
}
