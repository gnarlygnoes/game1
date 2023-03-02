import {Camera} from '../camera'
import {Store} from '../store/store'

export class TargetLocation {
  constructor(private store: Store) {}

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    const {targetPos} = this.store

    if (!targetPos) return

    const [x, y] = targetPos
    const [xS, yS] = camera.shift

    context.beginPath()
    context.fillStyle = '#00ff00cc'
    context.arc(x + xS, y + yS, 7, 0, Math.PI * 2)
    context.fill()
  }
}
