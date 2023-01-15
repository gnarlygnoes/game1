import {Mover, updateMover} from './mover/mover'
import {Updatable} from '../data-types/data-types'
import {Camera} from '../camera'
import {detectCollisions} from './mover/collisions'

export class Components implements Updatable {
  movers = new Map<number, Mover>()

  update(timeSince: number, camera: Camera): void {
    for (const m of this.movers.values()) {
      updateMover(m, timeSince, camera)
    }

    const {
      points: [a, b],
    } = camera
    detectCollisions(this.movers, a, b)
  }
}

let nextId = 0

export function nextEntityId(): number {
  const id = nextId

  nextId++

  return id
}
