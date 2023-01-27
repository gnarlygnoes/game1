import {Controls} from './controls'
import {V2, V2RO} from '../data-types/v2'

export class TouchControls {
  startPos: V2RO = V2.empty

  constructor(private controls: Controls) {
    addEventListener('pointerdown', e => {
      if (e.currentTarget instanceof Window) {
        const {clientX, clientY} = e

        this.startPos = [clientX, clientY]
        addEventListener('pointermove', this.onMove)
        addEventListener('pointerup', this.onUp, {once: true})
        addEventListener('pointerout', this.onUp, {once: true})
      }
    })
  }

  onMove = (e: PointerEvent) => {
    if (e.currentTarget instanceof Window) {
      const {clientX, clientY} = e

      const [x, y] = this.startPos

      const dx = clientX - x
      const dy = clientY - y

      const scale = Math.min(Math.abs(dx) / 20, 4)

      if (dx < -10) {
        this.controls.rotation = -scale
      } else if (dx > 10) {
        this.controls.rotation = scale
      } else {
        this.controls.rotation = 0
      }

      if (dy < -10) {
        this.controls.thrust = Math.min(Math.abs(dy) / 50, 0.9)
      } else {
        this.controls.thrust = 0
      }
    }
  }

  onUp = () => {
    removeEventListener('pointermove', this.onMove)

    this.controls.rotation = 0
    this.controls.thrust = 0
  }
}
