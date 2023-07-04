import {Mover} from './mover'
import {V2, V2RO} from '../../data-types/v2'

export function confirmCollision(
  idA: number,
  idB: number,
  movers: Map<number, Mover>
): boolean {
  const mA = movers.get(idA)
  const mB = movers.get(idB)

  if (mA && mB) {
    return V2.distance(mA.center, mB.center) <= mA.radius + mB.radius
  }
}

export function collisionEffect(
  idA: number,
  idB: number,
  movers: Map<number, Mover>
) {
  const mA = movers.get(idA)
  const mB = movers.get(idB)

  if (!mA || !mB) return

  const {center: cA, velocity: vA, mass: massA} = mA
  const {center: cB, velocity: vB, mass: massB} = mB

  const collision = V2.subtract(cB, cA)
  const distance = V2.distance(cB, cA)

  const normal: V2RO = [collision[0] / distance, collision[1] / distance]
  const relativeVelocity: V2RO = [vA[0] - vB[0], vA[1] - vB[1]]
  const speed =
    relativeVelocity[0] * normal[0] + relativeVelocity[1] * normal[1]

  if (speed < 0) {
    // We do nothing as the collision probably already happened last game loop.
    return
  }

  const impulse = (2 * speed) / (massA + massB)

  mA.velocity = [
    vA[0] - impulse * massB * normal[0],
    vA[1] - impulse * massB * normal[1],
  ]
  mB.velocity = [
    vB[0] + impulse * massA * normal[0],
    vB[1] + impulse * massA * normal[1],
  ]
}
