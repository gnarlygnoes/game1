import {Mover, updateMover} from './mover'
import {Updatable} from '../data-types/data-types'
import {Camera} from '../camera'

export class Components implements Updatable {
  movers = new Map<number, Mover>()

  update(timeSince: number, camera: Camera): void {
    for (const m of this.movers.values()) {
      updateMover(m, timeSince, camera)
    }
  }
}

let nextId = 0

export function nextEntityId(): number {
  const id = nextId

  nextId++

  return id
}
