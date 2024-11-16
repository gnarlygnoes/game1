import {Asteroid} from './asteroid'
import {Rand} from '../../lib/random'
import {Store} from '../../store/store'
import {GameObjects} from '../../store/game-objects'

export function initAsteroids(store: Store, go: GameObjects) {
  const d = 9000
  const n = 10000

  for (let i = 0; i < n; i++) {
    const a = new Asteroid(store, 5 + Rand.next() * 60, [
      -(d / 2) + Rand.next() * d,
      -(d / 2) + Rand.next() * d,
    ])

    go.add(a)
  }
}
