import {GoType} from '../../data-types/data-types'
import {Camera} from '../../camera'
import {V2RO} from '../../data-types/v2'
import {Store} from '../../store/store'
import {Mover} from '../../store/mover/mover'
import {MoverBoxes} from '../../stats/boxes'
import {Noise} from '../../lib/perlin'

export class Planet {
  type = GoType.visual as const

  m: Mover
  id: number
  texture: number[][] = []

  constructor(
    public store: Store,
    public size: number,
    pos: V2RO,
  ) {
    const {movers} = store

    const m = new Mover(pos, [size, size])
    this.m = m
    m.mass = 10000
    this.id = m.id

    movers.add(m)

    this.init()
  }

  readonly tileSize = 5
  readonly scale = 50

  init() {
    const noiseGen = new Noise()

    const {size, tileSize, scale} = this

    const len = size / tileSize

    this.texture = []

    for (let x = 0; x < len; x++) {
      this.texture.push([])
      for (let y = 0; y < len; y++) {
        const shade =
          40 +
          noiseGen.simplex2(x / scale, y / scale) * 128 +
          noiseGen.simplex2(x / (scale / 2), y / (scale / 2)) * 128 +
          noiseGen.simplex2(x / (scale / 4), y / (scale / 4)) * 128

        this.texture[x].push(shade)
      }
    }

    console.log(this.texture)
  }

  update(timeSince: number, camera: Camera) {}

  draw(context: CanvasRenderingContext2D, camera: Camera): void {
    const {m} = this

    MoverBoxes.draw(context, m, camera)

    if (!m.visible) return

    // this.drawCircle(context, camera)
    this.drawTexture(context, camera)
  }

  drawCircle(context: CanvasRenderingContext2D, camera: Camera) {
    const {m, size} = this

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
      Math.PI * 2,
    )
    context.fill()
  }

  drawTexture(context: CanvasRenderingContext2D, camera: Camera): void {
    const {m, size, texture, tileSize} = this

    if (!m.visible) return

    const {
      shift: [xShift, yShift],
    } = camera
    const {position} = m
    const [x1, y1] = position

    for (let x = 0; x < texture.length; x++) {
      for (let y = 0; y < texture[x].length; y++) {
        const shade = texture[x][y]
        context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        context.fillRect(
          x * tileSize + xShift + x1,
          y * tileSize + yShift + y1,
          tileSize,
          tileSize,
        )
      }
    }
  }
}
