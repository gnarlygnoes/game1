import {bucketIntersection, createBuckets} from './collisions'
import {assert, time, timeEnd} from '../../lib/util'
import {Camera} from '../../camera'
import {claimId, CmpI, Id} from '../../lib/cmp'
import {Store} from '../store'
import {Mover} from './mover'
import {V2, Vec2, vec2} from '../../data-types/v2.ts'

export enum I {
  // 2d vec
  // pos = 0,
  size = 2,
  direction = 4,
  velocity = 6,
  thrust = 8,

  // single values
  rotation = 10,
  mass = 11,
  maxVelocity = 12,
  visible = 13,
  deleted = 14,
  len = 15,
}

const moversLen = 12000
const moversSize = moversLen * I.len

export class Movers3 {
  // TODO: Compare Float64 and standard array perf.
  data = new Float64Array(moversSize)

  posX(id: Id): number {
    return this.data[id]
  }
  posY(id: Id): number {
    return this.data[id + 1]
  }
  width(id: Id): number {
    return this.data[id + I.size]
  }
  height(id: Id): number {
    return this.data[id + I.size + 1]
  }
  dir(id: Id): V2 {
    return [this.data[id + I.direction], this.data[id + I.direction + 1]]
  }
  dirX(id: Id): number {
    return this.data[id + I.direction]
  }
  dirY(id: Id): number {
    return this.data[id + I.direction + 1]
  }
  velX(id: Id): number {
    return this.data[id + I.velocity]
  }
  velY(id: Id): number {
    return this.data[id + I.velocity + 1]
  }
  thrustX(id: Id): number {
    return this.data[id + I.thrust]
  }
  thrustY(id: Id): number {
    return this.data[id + I.thrust + 1]
  }
  rotation(id: Id): number {
    return this.data[id + I.rotation]
  }
  mass(id: Id): number {
    return this.data[id + I.mass]
  }
  maxVelocity(id: Id): number {
    return this.data[id + I.maxVelocity]
  }
  visible(id: Id): boolean {
    return !!this.data[id + I.visible]
  }

  // Just for compatibility. Probably slow.
  setFromMover(m: Mover) {
    const a = this.data
    const i = m.id
    a[i] = m.position[0]
    a[i + 1] = m.position[1]
    a[i + I.size] = m.size[0]
    a[i + I.size + 1] = m.size[1]
    a[i + I.direction] = m.direction[0]
    a[i + I.direction + 1] = m.direction[1]
    a[i + I.velocity] = m.velocity[0]
    a[i + I.velocity + 1] = m.velocity[1]
    a[i + I.thrust] = m.thrust[0]
    a[i + I.thrust + 1] = m.thrust[1]
    a[i + I.rotation] = m.rotation
    a[i + I.mass] = m.mass
    a[i + I.maxVelocity] = m.maxVelocity
    a[i + I.visible] = m.visible ? 1 : 0
    a[i + I.deleted] = 0
  }

  // Just for compatibility. Probably slow.
  getMover(id: Id): Mover | null {
    const a = this.data
    const i = id

    if (a[id + I.deleted] === 1) return null

    const m = new Mover()
    m.position = [a[i], a[i + 1]]
    m.size = [a[i + I.size], a[i + I.size + 1]]
    m.direction = [a[i + I.direction], a[i + I.direction + 1]]
    m.velocity = [a[i + I.velocity], a[i + I.velocity + 1]]
    m.thrust = [a[i + I.thrust], a[i + I.thrust + 1]]
    m.rotation = a[i + I.rotation]
    m.mass = a[i + I.mass]
    m.maxVelocity = a[i + I.maxVelocity]
    m.visible = !!a[i + I.visible]

    return m
  }

  updateMover(id: Id, timeSince: number, camera: Camera) {
    const rotation = this.rotation(id)
    if (rotation !== 0) {
      const angle = (timeSince / 1000) * rotation
      const i = id + I.direction
      this.rotate(i, angle)
      this.normalise(i)
    }

    if (this.thrustX(id) !== 0 || this.thrustY(id) !== 0) {
      const thrust = this.getVec2(id + I.thrust)
      const velocity = this.getVec2(id + I.velocity)
      const newVelocity = velocity
        .add(thrust.scale(timeSince / 100))
        .limitMagnitude(this.maxVelocity(id))
      this.setVec2(id + I.velocity, newVelocity)
    }

    this.setVec2(id, this.getPositionInFuture(id, timeSince))
    this.data[id + I.visible] = this.isVisible(id, camera) ? 1 : 0
  }

  delete(id: Id) {
    claimId(id)
    this.data[id + I.deleted] = 1
  }

  rotate(i: number, angle: number) {
    const a = this.data
    const x = a[i]
    const y = a[i + 1]
    const s = Math.sin(angle)
    const c = Math.cos(angle)

    a[i] = c * x - s * y
    a[i + 1] = s * x + c * y
  }

  normalise(i: number) {
    const a = this.data
    const x = a[i]
    const y = a[i + 1]
    const len = Math.sqrt(x ** 2 + y ** 2)
    if (len === 0) return

    const scale = 1 / len
    a[i] = x * scale
    a[i + 1] = y * scale
  }

  limitMagnitude(i: number, limit: number) {
    const a = this.data
    const x = a[i]
    const y = a[i + 1]

    const len = Math.sqrt(x ** 2 + y ** 2)
    if (len < limit) return
    const scale = limit / len
    a[i] = x * scale
    a[i + 1] = y * scale
  }

  getVec2(i: number): Vec2 {
    const a = this.data
    const x = a[i]
    const y = a[i + 1]

    return vec2(x, y)
  }

  setVec2(i: number, v: Vec2) {
    this.data[i] = v.x
    this.data[i + 1] = v.y
  }

  scale(i: number, scale: number) {
    const a = this.data
    const x = a[i]
    const y = a[i + 1]
    a[i] = x * scale
    a[i + 1] = y * scale
  }

  getPositionInFuture(id: Id, time: number): Vec2 {
    const position = this.getVec2(id)
    const velocity = this.getVec2(id + I.velocity)

    // Try 16 here to be close to frame time of 60fps.
    return position.add(velocity.scale(time / 16))
  }

  isVisible(id: Id, camera: Camera): boolean {
    const {
      width,
      height,
      shift: [cx, cy],
    } = camera

    let x = this.posX(id)
    let y = this.posY(id)
    const w = this.width(id)
    const h = this.height(id)

    const extra = (w + h) / 2

    x += w / 2
    y += h / 2

    const left = -cx - extra
    const top = -cy - extra
    const right = -cx + width + extra
    const bottom = -cy + height + extra

    return x > left && x < right && y > top && y < bottom
  }

  length = moversSize
}

export class MoversA implements CmpI<Mover> {
  data = new Movers3()

  set(id: Id, value: Mover): void {
    this.data.setFromMover(value)
  }
  get(id: Id): Mover | null {
    return this.data.getMover(id)
  }
  delete(id: Id): void {
    this.data.delete(id)
  }

  [Symbol.iterator](): Iterator<Mover> {
    let id = 0
    const {data} = this

    return {
      next(): IteratorResult<Mover> {
        while (id < moversSize) {
          const value = data.getMover(id)
          id += I.len
          if (value !== null) {
            return {value, done: false}
          }
        }
        return {value: null, done: true}
      },
    }
  }
}

const INCREMENT_SIZE = 10

function detectCollisions(
  store: Store,
  movers: Movers3,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  time(detectCollisions.name)

  const xBuckets = fillXBuckets(x1, x2, INCREMENT_SIZE, movers)
  const yBuckets = fillYBuckets(y1, y2, INCREMENT_SIZE, movers)

  const intersecting = bucketIntersection(xBuckets, yBuckets)

  timeEnd(detectCollisions.name)

  const {gameObjects} = store

  // for (const [idA, idB] of intersecting) {
  //   if (!confirmCollision(idA, idB, movers)) continue
  //   const a = gameObjects.objects.get(idA)
  //   const b = gameObjects.objects.get(idB)
  //   if (!a || !b) continue
  //
  //   if (a.type === GoType.weapon || a.type === GoType.pickup) {
  //     a.hit(b)
  //   } else if (b.type === GoType.weapon || b.type === GoType.pickup) {
  //     b.hit(a)
  //   } else {
  //     collisionEffect(idA, idB, movers)
  //   }
  // }
}

// Note: min and max could be negative.
export function fillXBuckets(
  min: number,
  max: number,
  incrementSize: number,
  movers: Movers3,
) {
  const buckets = createBuckets(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (let id = 0; id < movers.length; id += I.len) {
    if (!movers.visible(id)) {
      continue
    }

    const x = movers.posX(id) + pixelShift
    const w = movers.width(id)

    for (let c = x; c < x + w; c += incrementSize) {
      if (c >= min && c <= max) {
        const i = Math.floor(c / incrementSize)

        buckets[i].push(id)
      }
    }
  }

  assert(
    buckets.length === length,
    `Expected bucket length not to grow ${JSON.stringify(buckets)}`,
  )
  return buckets
}

export function fillYBuckets(
  min: number,
  max: number,
  incrementSize: number,
  movers: Movers3,
) {
  const buckets = createBuckets(min, max, incrementSize)

  const {length} = buckets
  if (length === 0) return buckets

  const pixelShift = -min
  min += pixelShift
  max += pixelShift

  for (let id = 0; id < movers.length; id += I.len) {
    if (!movers.visible(id)) {
      continue
    }

    const y = movers.posY(id) + pixelShift
    const h = movers.height(id)

    for (let c = y; c < y + h; c += incrementSize) {
      if (c >= min && c <= max) {
        const i = Math.floor(c / incrementSize)

        buckets[i].push(id)
      }
    }
  }
  assert(
    buckets.length === length,
    `Expected bucket length not to grow ${JSON.stringify(buckets)}`,
  )
  return buckets
}
