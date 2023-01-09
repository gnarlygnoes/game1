import './stage.css'
import {$Component, c, Canvas, createRef} from '../../fiend-ui/src'
import {Store} from '../store/store'
import {Camera} from '../camera'

export class Stage extends $Component {
  store = new Store()

  ref = createRef<HTMLCanvasElement>()
  context: CanvasRenderingContext2D | null = null

  $size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  camera = new Camera(this.store, this.$size.width, this.$size.height)

  timeOfLastFrame = Date.now()

  render() {
    const {
      $size: {width, height},
    } = this

    return Canvas({
      ref: this.ref,
      className: c`Stage`,
      width,
      height,
    })
  }

  gameLoop = () => {
    const now = Date.now()
    const {
      gameObjects,
      gameObjects: {stats},
    } = this.store

    const timeSince = now - this.timeOfLastFrame

    const {context, camera} = this

    if (!context) return

    gameObjects.player.update(timeSince)
    camera.update()
    gameObjects.update(timeSince)

    gameObjects.draw(context, camera)
    gameObjects.player.draw(context, camera)

    stats.addFrameDuration(Date.now() - now)
    this.timeOfLastFrame = now

    requestAnimationFrame(this.gameLoop)
  }

  componentDidMount() {
    const {current} = this.ref

    if (current) {
      this.context = current.getContext('2d')

      this.gameLoop()
    }

    addEventListener('resize', () => {
      const {innerWidth: w, innerHeight: h} = window
      this.$size = {
        width: w,
        height: h,
      }
      this.camera.width = w
      this.camera.height = h
    })
  }
}
