import {Mover} from '../store/mover'
import {GameObject} from '../data-types/data-types'
import {Store} from '../store/store'
import {addV2, reverseV2, v2} from '../data-types/v2'
const ship = require('./spaceShips_003.png')

export class Player implements GameObject {
  m = new Mover(v2(innerWidth / 2, innerHeight * 0.7), v2(40, 40))

  shipImage = document.createElement('img')

  constructor(public store: Store) {
    this.shipImage.src = ship

    addEventListener('keydown', e => {
      console.log(e.key)

      switch (e.key) {
        case 'p':
          this.store.paused = !this.store.paused
          break
        case 'w':
        case 'ArrowUp':
          this.forward()
          break
        case 's':
        case 'ArrowDown':
          this.back()
          break
        case 'a':
        case 'ArrowLeft':
          this.left()
          break
        case 'd':
        case 'ArrowRight':
          this.right()
          break
      }
    })
  }

  forward() {
    // this.m.position.y -= 1

    this.m.position = addV2(this.m.position, reverseV2(this.m.direction))
    // this.m.addAcceleration(1, 0)
  }

  back() {
    this.m.position.y += 1
  }

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
      m: {size},
    } = this

    // const angle = this.m.getAngle()

    // ctx.fillStyle = 'grey'

    let x = innerWidth / 2
    let y = innerHeight * 0.5

    ctx.translate(x, y)
    ctx.rotate(Math.PI)
    // ctx.rotate(angle)

    ctx.drawImage(this.shipImage, -size.x / 2, -size.y / 2, size.x, size.y)

    // ctx.rotate(-angle)
    ctx.rotate(-Math.PI)
    ctx.translate(-x, -y)
  }

  update(now: number, last: number): void {
    this.m.update(now, last)
  }
}
