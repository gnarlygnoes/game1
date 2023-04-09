import {Store} from '../store/store'
import {V2} from '../data-types/v2'
import {Mover} from '../store/mover/mover'
import {Camera} from '../camera'
import {GoType} from '../data-types/data-types'
import {GO} from '../store/game-objects'

// const size = 4

const defaultSize = 4
const defaultColour = 'rgb(255,200,0)'
const hitDuration = 100

export class Projectile {
  id: number

  type = GoType.weapon as const

  damage = 7
  health = 1

  static velocity = 10

  startedHitAnimation = false
  hitAnimationTimeLeft = 0

  m: Mover

  size = defaultSize

  maxSize = 2 + Math.random() * 10

  colour = defaultColour

  constructor(
    public store: Store,
    public origin: Mover,
    public originId: number,
    side: 'left' | 'right'
  ) {
    const {movers, gameObjects} = store

    let p = origin.center

    if (side === 'left') {
      const angle = V2.angle(origin.direction)
      p = V2.add(p, V2.rotate([-10, -6], angle))
    } else {
      const angle = V2.angle(origin.direction)
      p = V2.add(p, V2.rotate([10, -6], angle))
    }

    this.m = new Mover(
      p,
      [this.size, this.size],
      origin.direction,
      V2.add(origin.velocity, V2.scale(origin.direction, Projectile.velocity)),
      V2.empty,
      0,
      0.05,
      100
    )

    this.id = this.m.id
    movers.add(this.m)
    gameObjects.add(this)
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
    const {m} = this

    const {
      position: [x, y],
    } = m

    const {
      shift: [xShift, yShift],
    } = camera

    ctx.fillStyle = this.colour
    ctx.beginPath()
    ctx.arc(x + xShift, y + yShift, this.size / 1.3, 0, 2 * Math.PI)
    ctx.fill()
  }

  update(timeSince: number, camera: Camera): void {
    if (this.startedHitAnimation) {
      this.hitAnimationTimeLeft -= timeSince

      const {hitAnimationTimeLeft} = this

      if (hitAnimationTimeLeft <= 0) {
        this.store.gameObjects.delete(this.id)
      } else {
        // this.colour = `rgb(255, 255, 255)`

        this.size = Math.min(
          (hitDuration * defaultSize) / hitAnimationTimeLeft,
          this.maxSize
        )
      }
    }

    if (!this.m.visible) {
      this.store.gameObjects.delete(this.id)
    }
  }

  hit(other: GO) {
    if (other.type !== GoType.visual && other.id !== this.originId) {
      this.startedHitAnimation = true
      this.hitAnimationTimeLeft = hitDuration
      this.m.velocity = V2.empty
      this.m.size = V2.empty

      other.health -= this.damage

      if (other.health <= 0) {
        this.store.gameObjects.delete(other.id)
      }
    }
  }
}
