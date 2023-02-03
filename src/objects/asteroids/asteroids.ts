import {Asteroid} from './asteroid'
import {Rand} from '../../misc/random'
import {Store} from '../../store/store'
import {GO} from '../../store/game-objects'

export function initAsteroids(store: Store, objects: Map<number, GO>) {
  const d = 9000
  const n = 6_000

  for (let i = 0; i < n; i++) {
    const a = new Asteroid(store, 10 + Rand.next() * 40, [
      -(d / 2) + Rand.next() * d,
      -(d / 2) + Rand.next() * d,
    ])

    objects.set(a.id, a)
  }
}
