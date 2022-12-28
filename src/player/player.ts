import {Mover} from '../store/mover'
import {GameObject, v2} from '../store/data-types'
import {Store} from '../store/store'
const ship = require('./spaceShips_003.png')

export class Player implements GameObject {
  m = new Mover(1, v2(innerWidth / 2, innerHeight * 0.8), v2(40, 40))

  shipImage = document.createElement('img')

  constructor(public store: Store) {
    this.shipImage.src = ship

    addEventListener('keydown', e => {
      console.log(e.key)

      switch (e.key) {
        case 'p':
          this.store.paused = !this.store.paused
          break
        case 'ArrowUp':
          this.forward()
          break
        case 'ArrowDown':
          this.back()
          break
        case 'ArrowLeft':
          this.left()
          break
        case 'ArrowRight':
          this.right()
          break
      }
    })
  }

  forward() {
    this.m.addAcceleration(1, 0)
  }

  back() {}

  left() {
    this.m.rotate(-0.1)
  }

  right() {
    this.m.rotate(0.1)
  }

  draw(
    ctx: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number
  ): void {
    const {
      m: {
        position: {x, y},
        size,
      },
    } = this

    const angle = this.m.getAngle()

    ctx.fillStyle = 'grey'

    ctx.translate(x, y)
    ctx.rotate(angle)

    ctx.drawImage(this.shipImage, -size.x / 2, -size.y / 2, size.x, size.y)

    ctx.rotate(-angle)
    ctx.translate(-x, -y)
  }

  update(now: number, last: number): void {
    this.m.update(now, last)
  }
}
