import {Mover, getPositionInFuture} from '../store/mover/mover'
import {V2, V2RO} from '../data-types/v2'

// Returns thrust.
export function chase(shipMover: Mover, target: V2RO): number {
  const {size, velocity, position} = shipMover

  const [x, y] = position
  const [w, h] = size

  const distance = V2.subtract(target, [x + w / 2, y + h / 2])

  if (V2.magnitude2(distance) < 50) {
    shipMover.thrust = V2.empty
    return 0
  }

  const targetVector = V2.limitMagnitude(distance, 10)

  const acclVector = V2.subtract(targetVector, velocity)

  shipMover.direction = V2.normalise(acclVector)
  shipMover.thrust = V2.scale(shipMover.direction, 1 / 1.5)

  return 1
}

// Returns thrust.
export function chaseShip(shipMover: Mover, otherShip: Mover): number {
  const speed = V2.magnitude2(otherShip.velocity)

  let targetPosition

  if (speed < 1) {
    targetPosition = otherShip.position
  } else {
    const distance = V2.distance(otherShip.position, shipMover.position)
    const time = distance / V2.magnitude2(otherShip.velocity)

    targetPosition = getPositionInFuture(otherShip, time)
  }

  return chase(shipMover, targetPosition)
}

export function similarVelocity(a: Mover, b: Mover) {
  const velocityDiff = V2.subtract(b.velocity, a.velocity)

  return V2.magnitude2(velocityDiff) < 2
}

export function matchVelocity(shipMover: Mover, otherShip: Mover): boolean {
  const velocityDiff = V2.subtract(otherShip.velocity, shipMover.velocity)

  shipMover.direction = V2.normalise(velocityDiff)
  shipMover.thrust = V2.scale(shipMover.direction, 1 / 1.5)

  return false
}
