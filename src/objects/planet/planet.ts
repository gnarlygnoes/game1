import {GoType} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {V2RO} from '../../data-types/v2'
import {Store} from '../../store/store'
import {Mover} from '../../store/mover/mover'
import {MoverBoxes} from '../../stats/boxes'

export class Planet {
  type = GoType.visual as const

  m: Mover
  id: number

  constructor(public store: Store, public size: number, pos: V2RO) {
    const {movers} = store

    const m = new Mover(pos, [size, size])
    this.m = m
    m.mass = 10000
    this.id = m.id

    movers.add(m)
  }

  update(timeSince: number, camera: Camera) {}

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    const {m, size} = this

    MoverBoxes.draw(context, m, camera)

    if (!m.visible) return

    const {
      shift: [xShift, yShift],
    } = camera
    const {position} = m
    const [x, y] = position

    context.beginPath()
    context.fillStyle = 'rgb(255, 100, 100)'
    context.arc(
      size / 2 + x + xShift,
      size / 2 + y + yShift,
      size / 2,
      0,
      Math.PI * 2
    )
    context.fill()
  }
}
