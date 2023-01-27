import {Controls} from './controls'
import {V2, V2RO} from '../data-types/v2'

export class TouchControls {
  startPos: V2RO = V2.empty

  // Decimals from 0-1
  forward = 0
  left = 0
  right = 0

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

      // console.log(dx, dy)

      if (dx < -10) {
        this.controls.left = true
        this.controls.right = false
      } else if (dx > 10) {
        this.controls.right = true
        this.controls.left = false
      } else {
        this.controls.left = false
        this.controls.right = false
      }

      if (dy < -10) {
        this.controls.forward = true
      } else {
        this.controls.forward = false
      }
    }
  }

  onUp = () => {
    removeEventListener('pointermove', this.onMove)

    this.controls.left = false
    this.controls.right = false
    this.controls.forward = false
  }
}
