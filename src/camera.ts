import {Store} from './store/store'
import {V2, V2RO} from './data-types/v2'

export class Camera {
  scale = 1

  shift = V2.empty
  points: [V2RO, V2RO] = [V2.empty, V2.empty]

  constructor(
    private store: Store,

    // Always kept up to date.
    public width: number,
    public height: number
  ) {}

  update(): void {
    const {width, height, store} = this

    const {movers} = store.components

    const {id} = this.store.gameObjects.player

    const p = movers.get(id)
    if (!p) return

    const [x, y] = p.position

    const w2 = width / 2
    const h2 = height / 2

    this.shift = [-x + w2, -y + h2]

    this.points = [
      [x - w2, y - h2],
      [x + w2, y + h2],
    ]
  }
}
