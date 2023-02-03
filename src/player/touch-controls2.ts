import {Controls} from './controls'
import {V2, V2RO} from '../data-types/v2'
import {Store} from '../store/store'

export class TouchControls2 {
  startPos: V2RO = V2.empty

  constructor(private store: Store, private controls: Controls) {
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

      const magnitude = V2.magnitude(dx, dy)

      if (magnitude > 15) {
        this.controls.thrust = Math.min(0.9, (magnitude - 15) / 50)
      } else {
        this.controls.thrust = 0
      }

      if (magnitude > 5) {
        this.store.gameObjects.player.m.direction = V2.normalise([dx, dy])
      }
    }
  }

  onUp = () => {
    removeEventListener('pointermove', this.onMove)

    this.controls.rotation = 0
    this.controls.thrust = 0
  }
}
