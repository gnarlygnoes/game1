import {Store} from './store/store'
import {V2} from './data-types/v2'

export class Camera {
  scale = 1

  shift = V2.empty

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

    this.shift = [-x + width / 2, -y + height / 2]
  }
}
