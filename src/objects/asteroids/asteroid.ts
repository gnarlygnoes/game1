import {Drawable, Entity} from '../../data-types/data-types'
import {V2} from '../../data-types/v2'
import {Rand} from '../../misc/random'
import {Camera} from '../../camera'
import {Store} from '../../store/store'
import {Mover} from '../../store/mover/mover'

const numPoints = 13
const useCache = true

export class Asteroid implements Drawable, Entity {
  points: V2[] = []

  id: number

  canvas = new OffscreenCanvas(this.size * 3, this.size * 3)

  first = true

  bitmap: ImageBitmap | null = null

  constructor(public store: Store, public size = 20, pos: V2) {
    const {movers} = store

    const m = new Mover(pos, [size, size])
    this.id = m.id
    movers.add(m)

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

  drawBitMap(): void {
    const ctx = this.canvas.getContext(
      '2d'
    ) as OffscreenCanvasRenderingContext2D | null

    if (!ctx) return
    const {
      size,
      store: {movers},
      id,
    } = this
    const m = movers.get(id)
    if (!m || !m.visible) return

    ctx.beginPath()

    const c = size * 1.5

    const gradient = ctx.createRadialGradient(c, c, size / 10, c, c, size)

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

    ctx.font = '14px monospace'
    ctx.fillStyle = 'yellow'
    // ctx.lineWidth = 2
    // ctx.strokeStyle = 'yellow'

    ctx.fillText(this.id.toString(), first[0] + c / 2, first[1] + c / 2)
    // ctx.strokeRect(m.position[0], m.position[1], size, size)

    this.first = false

    this.bitmap = this.canvas.transferToImageBitmap()
  }

  drawCached(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.bitmap) {
      this.drawBitMap()
    }

    if (this.bitmap) {
      const {id, size} = this
      const {movers} = this.store

      const m = movers.get(id)
      if (!m || !m.visible) return

      const {
        position: [xi, yi],
      } = m

      const {
        shift: [xShift, yShift],
      } = camera

      ctx.beginPath()

      const x = xi + xShift
      const y = yi + yShift

      ctx.drawImage(this.bitmap, x - size * 1.5, y - size * 1.5)

      ctx.lineWidth = 1
      ctx.strokeStyle = 'yellow'
      ctx.strokeRect(x, y, size, size)
    }
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    if (useCache) {
      this.drawCached(ctx, camera)
    } else {
      this.drawUnCached(ctx, camera)
    }
  }

  drawUnCached(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {movers} = this.store

    const m = movers.get(this.id)
    if (!m || !m.visible) return

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
