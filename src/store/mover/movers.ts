import {Mover, updateMover} from './mover'
import {Updatable} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {detectCollisions} from './collisions'
import {Movers3} from './movers3'

export class Movers implements Updatable {
  map = new Map<number, Mover>()

  movers2 = new Movers3()
  // array: Mover[] = []

  update(timeSince: number, camera: Camera): void {
    for (const m of this.map.values()) {
      updateMover(m, timeSince, camera)
    }

    const {
      points: [a, b],
    } = camera

    detectCollisions(camera.store, this.map, a, b)
  }

  add(mover: Mover): void {
    this.movers2.setFromMover(mover)
    this.map.set(mover.id, mover)
  }

  get(id: number): Mover | undefined {
    return this.map.get(id)
  }

  delete(id: number) {
    this.movers2.delete(id)
    this.map.delete(id)
  }
}
