import {Mover} from '../store/mover/mover'
import {Camera} from '../camera'

export const MoverBoxes = new (class {
  enabled = __DEV__

  enable(on: boolean) {
    this.enabled = on
  }

  draw(ctx: CanvasRenderingContext2D, m: Mover, camera: Camera) {
    if (!this.enabled) return

    const {
      shift: [xShift, yShift],
    } = camera

    const {
      position: [x, y],
      size: [w, h],
    } = m

    ctx.lineWidth = 1
    ctx.strokeStyle = 'yellow'

    ctx.strokeRect(x + xShift, y + yShift, w, h)
  }
})()
