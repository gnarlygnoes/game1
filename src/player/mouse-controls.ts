import {Controls} from './controls'
import {V2} from '../data-types/v2'
import {Store} from '../store/store'

export class MouseControls {
  // targetPos: V2RO | null = null

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
    const {
      m: {size, velocity, position},
    } = gameObjects.player

    const [x, y] = position
    const [w, h] = size

    const distance = V2.subtract(targetPos, [x + w / 2, y + h / 2])

    console.log(distance, V2.magnitude(distance[0], distance[1]))

    if (V2.magnitude(distance[0], distance[1]) < 50) {
      this.store.targetPos = null
      this.controls.thrust = 0
      return
    }

    const targetVector = V2.limitMagnitude(distance, 10)

    const acclVector = V2.subtract(targetVector, velocity)

    this.controls.thrust = 1

    gameObjects.player.m.direction = V2.normalise(acclVector)

    console.log({target: this.store.targetPos})
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
