import {Controls} from './controls'
import {V2, V2RO} from '../data-types/v2'
import {Store} from '../store/store'

export class MouseControls {
  targetPos: V2RO | null = null

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
    const {targetPos} = this

    if (!targetPos) return

    const {camera, gameObjects} = this.store
    const {
      m: {size, velocity, position},
    } = gameObjects.player

    const [x, y] = position
    const [w, h] = size

    // console.log(-(camera.width / 2 - clientX), -(camera.height / 2 - clientY))

    // const targetPos: V2 = [
    //   -(camera.width / 2 - clientX),
    //   -(camera.height / 2 - clientY),
    // ]
    // this.targetPos = targetPos

    const targetVector = V2.limitMagnitude(targetPos, 10)

    const acclVector = V2.subtract(targetVector, velocity)

    this.controls.thrust = 1
    // this.controls.rotation = V2.angle(acclVector)
    gameObjects.player.m.direction = V2.normalise(acclVector)

    console.log(this.targetPos)
  }

  setTargetPosition(clientX: number, clientY: number) {
    const {camera} = this.store

    const targetPos: V2 = [
      -(camera.width / 2 - clientX),
      -(camera.height / 2 - clientY),
    ]
    this.targetPos = targetPos
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
