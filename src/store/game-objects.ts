import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Asteroid} from '../objects/asteroids/asteroid'
import {Camera} from '../camera'

export class GameObjects implements Updatable, Drawable {
  objects: GameObject[] = []

  player = new Player(this.store)
  stats = new Stats(this.store)

  constructor(public store: Store) {
    this.objects.push(
      new Stars(store),
      this.stats,
      new Asteroid(20, [100, 100]),
      new Asteroid(18, [240, 180]),
      new Asteroid(16, [300, 200]),
      new Asteroid(26, [-300, -200]),
      new Asteroid(6, [-100, -200]),
      new Asteroid(36, [300, -200]),
      new Asteroid(20, [1000, 100]),
      new Asteroid(18, [240, 1800]),
      new Asteroid(16, [3000, 200]),
      new Asteroid(26, [-300, -2000]),
      new Asteroid(60, [-1000, -200]),
      new Asteroid(36, [300, -2000])
    )
  }

  update(timeSince: number) {
    for (const o of this.objects) {
      o.update(timeSince)
    }
  }

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    for (const o of this.objects) {
      o.draw(context, camera)
    }
  }
}

type V3 = [number, number, number]

namespace V3 {
  export function add(a: V3, b: V3): V3 {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
  }
}

V3.add([1, 1, 1], [2, 2, 2])
