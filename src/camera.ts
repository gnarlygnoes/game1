import {Store} from './store/store'
import {V2, V2RO} from './data-types/v2'

export class Camera {
  scale = 1

  shift = V2.empty
  points: [V2RO, V2RO] = [V2.empty, V2.empty]

  constructor(
    public store: Store,

    // Always kept up to date.
    public width: number,
    public height: number
  ) {}

  update(): void {
    const {width, height, store} = this

    const {movers} = store
    const {id} = this.store.gameObjects.player
    const m = movers.get(id)
    if (!m) return

    const {
      position: [x, y],
      size: [pw, ph],
    } = m

    const w2 = width / 2
    const h2 = height / 2

    this.shift = [-x + w2 - pw / 2, -y + h2 - ph / 2]

    this.points = [
      [x - w2, y - h2],
      [x + w2, y + h2],
    ]
  }
}
