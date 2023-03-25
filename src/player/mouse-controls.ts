import {Controls} from './controls'
import {Store} from '../store/store'
import {chase} from '../objects/chase'

export class MouseControls {
  constructor(private store: Store, private controls: Controls) {
    addEventListener('pointerdown', e => {
      if (e.currentTarget instanceof Window) {
        const {clientX, clientY} = e

        this.setTargetPosition(clientX, clientY)

        addEventListener('pointermove', this.onMove)
        addEventListener('pointerup', this.onUp, {once: true})
        addEventListener('pointerout', this.onUp, {once: true})
      }
    })
  }

  update() {
    const {targetPos} = this.store

    if (!targetPos) return

    const {gameObjects} = this.store

    const thrust = chase(gameObjects.player.m, targetPos)
    this.controls.thrust = thrust

    if (thrust === 0) {
      this.store.targetPos = null
    }
  }

  setTargetPosition(clientX: number, clientY: number) {
    const {
      shift: [x, y],
    } = this.store.camera

    this.store.targetPos = [clientX - x, clientY - y]
  }

  onMove = (e: PointerEvent) => {
    if (e.currentTarget instanceof Window) {
      const {clientX, clientY} = e

      this.setTargetPosition(clientX, clientY)
    }
  }

  onUp = () => {
    removeEventListener('pointermove', this.onMove)

    this.controls.rotation = 0
    this.controls.thrust = 0
  }
}
