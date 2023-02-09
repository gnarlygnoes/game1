import {GoType} from '../../data-types/data-types'
import {V2} from '../../data-types/v2'
import {Rand} from '../../misc/random'
import {Camera} from '../../camera'
import {Store} from '../../store/store'
import {Mover} from '../../store/mover/mover'
import {MoverBoxes} from '../../stats/boxes'
import {Cacheable} from './cacheable'

const numPoints = 13
const useCache = false

export class Asteroid {
  points: V2[] = []

  id: number

  type = GoType.object as const

  health = this.size

  cache = useCache ? new Cacheable(this.size * 1.2) : null

  constructor(public store: Store, public size = 20, pos: V2) {
    const {movers} = store

    const m = new Mover(pos, [size, size])
    m.mass = (size / 15) ** 1.6
    this.id = m.id
    movers.add(m)

    this.generatePoints()
  }

  private generatePoints() {
    const {size} = this

    for (let i = 0; i < numPoints; i++) {
      const r1 = Rand.next() - 0.5
      const r2 = Rand.next() - 0.5

      const p = V2.scale(
        V2.rotate([r1 * 0.25, 1 + r2 * 0.25], ((2 * Math.PI) / numPoints) * i),
        size / 2.2
      )

      p[0] += 0.03
      p[1] += 0.03

      this.points.push(p)
    }
  }

  drawToCanvasAndCreateBitMap(): void {
    if (!this.cache) return

    const {
      size,
      cache,
      cache: {ctx},
    } = this

    if (!ctx) return

    const c = size / 2

    this.drawAsteroid(ctx, c, c)

    cache.cached = true
  }

  drawAsteroid(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.beginPath()

    const gradient = ctx.createRadialGradient(
      x,
      y,
      this.size / 20,
      x,
      y,
      this.size / 2
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

  drawCached(ctx: CanvasRenderingContext2D, camera: Camera, m: Mover): void {
    if (!this.cache) return

    if (!this.cache.cached) {
      this.drawToCanvasAndCreateBitMap()
    }

    if (this.cache.cached) {
      const {
        position: [xi, yi],
      } = m

      const {
        shift: [xShift, yShift],
      } = camera

      ctx.drawImage(this.cache.canvas, xi + xShift, yi + yShift)
      MoverBoxes.draw(ctx, m, camera)
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    const {movers} = this.store

    const m = movers.get(this.id)
    if (!m || !m.visible) {
      return
    }

    if (useCache) {
      this.drawCached(ctx, camera, m)
    } else {
      this.drawUnCached(ctx, camera, m)
    }
  }

  drawUnCached(ctx: CanvasRenderingContext2D, camera: Camera, m: Mover): void {
    const {
      position: [xi, yi],
    } = m
    const {
      shift: [xShift, yShift],
    } = camera

    const c = this.size / 2

    this.drawAsteroid(ctx, xi + xShift + c, yi + yShift + c)
    MoverBoxes.draw(ctx, m, camera)
  }

  update(timeSince: number, camera: Camera) {}
}
