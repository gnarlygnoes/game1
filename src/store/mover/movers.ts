import {Mover, updateMover} from './mover'
import {Updatable} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {detectCollisions} from './collisions'

export class Movers implements Updatable {
  map = new Map<number, Mover>()
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
    this.map.set(mover.id, mover)
  }

  get(id: number): Mover | undefined {
    return this.map.get(id)
  }

  delete(id: number) {
    this.map.delete(id)
  }
}

function somethign() {
  new Float32Array(2)
}

export class Vec2 extends Float32Array {
  constructor(x: number, y: number) {
    super(2);
    this[0] = x;
    this[1] = y;
  }

  get x() {
    return this[0]
  }

  get y() {
    return this[1]
  }

  set x(x: number) {
    this[0]  = x
  }

  set y(y: number) {
    this[1] = y
  }
}