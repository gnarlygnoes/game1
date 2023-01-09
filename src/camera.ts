import {emptyV2} from './data-types/v2'
import {Store} from './store/store'

export class Camera {
  scale = 1

  shift = emptyV2

  constructor(
    private store: Store,

    // Always kept up to date.
    public width: number,
    public height: number
  ) {}

  update(): void {
    const {scale, width, height} = this

    const {m} = this.store.gameObjects.player

    const [x, y] = m.position

    this.shift = [-x + width / 2, -y + height / 2]
  }
}
