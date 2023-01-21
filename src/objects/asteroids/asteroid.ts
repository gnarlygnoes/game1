import {Drawable, Entity} from '../../data-types/data-types'
import {V2} from '../../data-types/v2'
import {Rand} from '../../misc/random'
import {Camera} from '../../camera'
import {Store} from '../../store/store'
import {Mover} from '../../store/mover/mover'
import {MoverBoxes} from '../../stats/boxes'

const numPoints = 13
const useCache = true

export class Asteroid implements Drawable, Entity {
  points: V2[] = []

  id: number

  canvas = new OffscreenCanvas(this.size * 1.2, this.size * 1.2)
  ctx: OffscreenCanvasRenderingContext2D | null

  bitmap: ImageBitmap | null = null

  constructor(public store: Store, public size = 20, pos: V2) {
    const {movers} = store

    const m = new Mover(pos, [size, size])
    this.id = m.id
    movers.add(m)

    this.generatePoints()

    this.ctx = this.canvas.getContext(
      '2d'
    ) as OffscreenCanvasRenderingContext2D | null
  }

  generatePoints() {
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
    const {size, ctx} = this

    if (!ctx) return

    ctx.beginPath()

    const c = size / 2

    const gradient = ctx.createRadialGradient(c, c, size / 20, c, c, size / 2)

    gradient.addColorStop(0, '#7e7e7e')
    gradient.addColorStop(0.9, '#5d5d5d')

    ctx.fillStyle = gradient
    ctx.strokeStyle = '#5d5d5d'
    ctx.lineWidth = 4

    const first = this.points[0]
    ctx.moveTo(c + first[0], c + first[1])

    for (const p of this.points) {
      ctx.lineTo(c + p[0], c + p[1])
    }

    ctx.lineTo(c + first[0], c + first[1])

    ctx.stroke()
    ctx.fill()

    this.bitmap = this.canvas.transferToImageBitmap()
  }

  drawCached(ctx: CanvasRenderingContext2D, camera: Camera, m: Mover): void {
    if (!this.bitmap) {
      this.drawToCanvasAndCreateBitMap()
    }

    if (this.bitmap) {
      const {
        position: [xi, yi],
      } = m

      const {
        shift: [xShift, yShift],
      } = camera

      ctx.beginPath()

      const x = xi + xShift
      const y = yi + yShift

      ctx.drawImage(this.bitmap, x, y)

      MoverBoxes.draw(ctx, m, camera)
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    const {movers} = this.store

    const m = movers.get(this.id)
    if (!m || !m.visible) return

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
}
