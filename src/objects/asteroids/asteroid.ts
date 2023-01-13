import {GameObject} from '../../data-types/data-types'
import {Mover} from '../../store/mover'
import {V2} from '../../data-types/v2'
import {Rand} from '../../misc/random'
import {Camera} from '../../camera'
import {Store} from '../../store/store'
import {MIds} from '../../store/movers'

const numPoints = 13

export class Asteroid2 implements GameObject {
  points: V2[] = []

  constructor(
    public store: Store,
    public id: number,
    public size = 20,
    pos: V2
  ) {
    const {data, len} = store.components.movers

    const shift = len * id

    data[shift + MIds.dirX] = pos[0]
    data[shift + MIds.dirY] = pos[1]

    for (let i = 0; i < numPoints; i++) {
      const r1 = Rand.next() - 0.5
      const r2 = Rand.next() - 0.5

      this.points.push(
        V2.scale(
          V2.rotate(
            [r1 * 0.25, 1 + r2 * 0.25],
            ((2 * Math.PI) / numPoints) * i
          ),
          size
        )
      )
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    // const {
    //   position: [xi, yi],
    // } = this.p

    const {data, len} = this.store.components.movers

    const shift = len * this.id
    const xi = data[shift + MIds.dirX]
    const yi = data[shift + MIds.dirY]

    const {
      shift: [xShift, yShift],
    } = camera

    ctx.beginPath()

    const x = xi + xShift
    const y = yi + yShift

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
    ctx.moveTo(x + first[0], y + first[1])

    for (const p of this.points) {
      ctx.lineTo(x + p[0], y + p[1])
    }

    ctx.lineTo(x + first[0], y + first[1])

    ctx.stroke()
    ctx.fill()
  }

  update(timeSince: number): void {}
}

export class Asteroid implements GameObject {
  p: Mover

  points: V2[] = []

  constructor(public size = 20, pos: V2) {
    this.p = new Mover(pos)

    for (let i = 0; i < numPoints; i++) {
      const r1 = Rand.next() - 0.5
      const r2 = Rand.next() - 0.5

      this.points.push(
        V2.scale(
          V2.rotate(
            [r1 * 0.25, 1 + r2 * 0.25],
            ((2 * Math.PI) / numPoints) * i
          ),
          size
        )
      )
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {
      position: [xi, yi],
    } = this.p

    const {
      shift: [xShift, yShift],
    } = camera

    ctx.beginPath()

    const x = xi + xShift
    const y = yi + yShift

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
    ctx.moveTo(x + first[0], y + first[1])

    for (const p of this.points) {
      ctx.lineTo(x + p[0], y + p[1])
    }

    ctx.lineTo(x + first[0], y + first[1])

    ctx.stroke()
    ctx.fill()
  }

  update(timeSince: number): void {}
}
