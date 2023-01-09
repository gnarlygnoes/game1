import {
  addV2,
  emptyV2,
  rotateV2,
  scaleV2,
  subtractV2,
  V2,
  V2RO,
} from './data-types/v2'
import {Store} from './store/store'
import {Mover} from './store/mover'

/*
Mapping game coordinates to canvas:

Game centre is [0, 0]
Assume screen 1200 x 800

Where is player ship?
[0, 0]

Where is camera? Camera centre? Camera top-left?

top-left: [-600, -400]

How does this effect canvas drawing?

Draw ship at [600, 400]?

 */

export class Camera {
  position: V2RO = emptyV2

  // Coordinate conversion to pixels?
  scale = 1

  constructor(
    private store: Store,
    public width: number,
    public height: number
  ) {}

  update(): void {
    const {scale, width, height} = this

    const {m} = this.store.gameObjects.player

    const [x, y] = m.position

    // Move camera based on screen size
    this.position = [-x - (width * scale) / 2, -y - (height * scale) / 2]

    // this.angle = -m.getAngle()
  }

  cameraTransform = (m: Mover) => {
    return transformObjects(m, this.position, 0, this.scale)
  }
}

export function transformObjects(
  m: Mover,
  cameraPosition: V2RO,
  angle: number,
  zoom: number
): MoverPixels {
  const {position, size} = m
  let p = addV2(position, cameraPosition)

  // p = rotateV2(p, angle)
  //
  // p = subtractV2(p, cameraPosition)

  return {
    position: p,
    size: scaleV2(size, zoom),
    angle: angle + m.getAngle(),
  }
}

export interface MoverPixels {
  position: V2
  size: V2
  angle: number
}
