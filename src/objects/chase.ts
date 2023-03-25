import {Mover} from '../store/mover/mover'
import {V2, V2RO} from '../data-types/v2'

// Returns true if still chasing.
export function chase(shipMover: Mover, target: V2RO): number {
  const {size, velocity, position} = shipMover

  const [x, y] = position
  const [w, h] = size

  const distance = V2.subtract(target, [x + w / 2, y + h / 2])

  if (V2.magnitude(distance[0], distance[1]) < 50) {
    shipMover.thrust = V2.empty
    return 0
  }

  const targetVector = V2.limitMagnitude(distance, 10)

  const acclVector = V2.subtract(targetVector, velocity)

  shipMover.direction = V2.normalise(acclVector)
  shipMover.thrust = V2.scale(shipMover.direction, 1 / 1.5)

  return 1
}
