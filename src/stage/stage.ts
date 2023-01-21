import './stage.css'
import {$Component, c, Canvas, createRef} from '../../fiend-ui/src'
import {Store} from '../store/store'

export class Stage extends $Component {
  ref = createRef<HTMLCanvasElement>()
  context: CanvasRenderingContext2D | null = null

  $size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  store = new Store(this.$size.width, this.$size.height)

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
      camera,
    } = this.store

    const timeSince = now - this.timeOfLastFrame

    const {context} = this

    if (!context) return

    gameObjects.update(timeSince, camera)
    gameObjects.player.update(timeSince)
    camera.update()

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
      this.store.camera.width = w
      this.store.camera.height = h
    })
  }
}
