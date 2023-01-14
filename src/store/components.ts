import {Mover2, updateMover} from './mover'
import {Updatable} from '../data-types/data-types'

export class Components implements Updatable {
  movers = new Map<number, Mover2>()

  update(timeSince: number): void {
    for (const m of this.movers.values()) {
      updateMover(m, timeSince)
    }
  }
}

let nextId = 0

export function nextEntityId(): number {
  const id = nextId

  nextId++

  return id
}
