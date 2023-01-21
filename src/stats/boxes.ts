import {Mover} from '../store/mover/mover'
import {Camera} from '../camera'

export const MoverBoxes = new (class {
  enabled = false

  enable(on: boolean) {
    this.enabled = on
  }

  draw(ctx: CanvasRenderingContext2D, m: Mover, camera: Camera) {
    if (!this.enabled) return

    const {
      shift: [xShift, yShift],
    } = camera

    const {
      position: [x1, y1],
      size: [w, h],
      id,
    } = m

    const x = x1 + xShift
    const y = y1 + yShift

    ctx.lineWidth = 1
    ctx.strokeStyle = 'yellow'

    ctx.font = '11px monospace'
    ctx.fillStyle = 'yellow'

    ctx.fillText(id.toString(), x + 1, y + 8)

    ctx.strokeRect(x, y, w, h)
  }
})()
