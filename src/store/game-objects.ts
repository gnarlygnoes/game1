import {Stars} from '../stars/stars'
import {Store} from './store'
import {Player} from '../player/player'
import {Stats} from '../stats/stats'
import {Camera} from '../camera'
import {initAsteroids} from '../objects/asteroids/asteroids'
import {Asteroid} from '../objects/asteroids/asteroid'
import {Projectile} from '../objects/projectile'
import {EnemyShip} from '../objects/enemies/enemy-ship'
import {TargetLocation} from '../player/target-location'
import {Mineral} from '../objects/asteroids/mineral'
import {Planet} from '../objects/planet/planet'

export type GO =
  | Player
  | Stats
  | Stars
  | Asteroid
  | Projectile
  | EnemyShip
  | Mineral
  | Planet

export class GameObjects {
  objects: Map<number, GO> = new Map()
  stats
  player
  targetLocation

  constructor(public store: Store) {
    this.stats = new Stats(store)
    this.player = new Player(this.store)
    this.targetLocation = new TargetLocation(this.store)
    if (__VITEST__) return

    // this.scratch(store)
    this.initGame(store)
  }

  scratch(store: Store) {
    this.add(new Stars(store))
    this.add(new Planet(store, 400, [-200, -200]))

    this.add(this.player)
    this.add(this.stats)
  }

  initGame(store: Store) {
    this.add(new Stars(store))

    // this.add(new Planet(store, 1000, [550, 550]))

    initAsteroids(store, this)

    // this.add(new EnemyShip(store, [300, 600]))
    // this.add(new EnemyShip(store, [400, 100]))
    this.add(new EnemyShip(store, [200, -600]))
    // this.add(new EnemyShip(store, [-500, 200]))

    this.add(this.player)
    this.add(this.stats)
  }

  add(gameObject: GO) {
    this.objects.set(gameObject.id, gameObject)
  }

  update(timeSince: number, camera: Camera) {
    this.store.movers.update(timeSince, camera)

    for (const o of this.objects.values()) {
      o.update(timeSince, camera)
    }
  }

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    for (const o of this.objects.values()) {
      o.draw(context, camera)
    }

    this.targetLocation.draw(context, camera)
  }

  delete(id: number): void {
    this.store.movers.delete(id)
    this.objects.delete(id)
  }
}
