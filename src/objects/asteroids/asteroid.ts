import {GoType} from '../../data-types/data-types'
import {AsteroidBase} from './asteroid-base'
import {V2} from '../../data-types/v2'
import {Rand} from '../../lib/random'
import {Mineral} from './mineral'

export class Asteroid extends AsteroidBase {
  type = GoType.object as const

  terminate() {
    const {store, size, id, m} = this

    store.gameObjects.delete(id)

    const particleSize = Math.random() * 4 + 5
    const numParticles = size / particleSize - 1

    for (let i = 0; i < numParticles; i++) {
      const a = new Mineral(
        store,
        particleSize,
        V2.add(m.position, [Rand.next(), -Rand.next()]),
      )

      a.m.direction = V2.rotate([0, 1], (360 / numParticles) * i)
      a.m.velocity = V2.scale(a.m.direction, 2)

      store.gameObjects.add(a)
    }
  }
}
