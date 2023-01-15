import {V2, V2RO} from '../data-types/v2'
import {Camera} from '../camera'

export class Mover {
  constructor(
    public position = V2.empty,

    public size = V2.empty,

    // Ideally unit vector
    public direction = V2.empty,

    public velocity = V2.empty,

    public thrust = V2.empty,

    public rotation = 0,

    public maxVelocity = 10,

    public visible = true
  ) {}
}

export function updateMover(mover: Mover, timeSince: number, camera: Camera) {
  if (mover.rotation !== 0) {
    const angle = (timeSince / 1000) * mover.rotation

    mover.direction = V2.normalise(V2.rotate(mover.direction, angle))
  }

  mover.velocity = V2.limitMagnitude(
    V2.add(mover.velocity, V2.scale(mover.thrust, timeSince / 100)),
    mover.maxVelocity
  )
  mover.position = V2.add(mover.position, mover.velocity)

  mover.visible = isVisible(mover.position, mover.size, camera)
}

function isVisible([x, y]: V2RO, [w, h]: V2RO, camera: Camera): boolean {
  const {
    width,
    height,
    shift: [cx, cy],
  } = camera

  const extra = 300

  const left = -cx - extra
  const top = -cy - extra
  const right = -cx + width + extra
  const bottom = -cy + height + extra

  return x > left && x < right && y > top && y < bottom
}
