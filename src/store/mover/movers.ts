import {Mover, updateMover} from './mover'
import {Updatable} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {detectCollisions} from './collisions'
import {CmpMap} from '../../lib/cmp.ts'
import {time, timeEnd} from '../../lib/util.ts'
import {MoversA} from './movers3.ts'

export class Movers implements Updatable {
  map = new CmpMap<Mover>()
  // map = new Cmp<Mover>()
  // map = new MoversA()

  update(timeSince: number, camera: Camera): void {
    time('movers')
    for (const m of this.map) {
      updateMover(m, timeSince, camera)
    }

    const {
      points: [a, b],
    } = camera

    detectCollisions(camera.store, this.map, a, b)
    timeEnd('movers')
  }

  add(mover: Mover): void {
    this.map.set(mover.id, mover)
  }

  get(id: number): Mover | null {
    return this.map.get(id)
  }

  delete(id: number) {
    this.map.delete(id)
  }
}
