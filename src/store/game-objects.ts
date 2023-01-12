import {Drawable, GameObject, Updatable} from '../data-types/data-types'
import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Camera} from '../camera'
import {Asteroids} from '../objects/asteroids/asteroids'

export class GameObjects implements Updatable, Drawable {
  objects: GameObject[] = []

  player = new Player(this.store)
  stats = new Stats(this.store)

  constructor(public store: Store) {
    this.objects.push(new Stars(store), new Asteroids(), this.stats)
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
