import './stage.css'
import {$Component, c, Canvas, createRef} from '../../fiend-ui/src'
import {Store} from '../store/store'
import {UiStore} from '../ui-store'

export class Stage extends $Component<{
  uiStore: UiStore
  store: Store
}> {
  ref = createRef<HTMLCanvasElement>()
  context: CanvasRenderingContext2D | null = null

  timeOfLastFrame = Date.now()

  render() {
    const {
      $size: {width, height},
    } = this.props.uiStore

    return Canvas({
      ref: this.ref,
      className: c`Stage`,
      width,
      height,
    })
  }

  gameLoop = () => {
    const {context} = this
    if (!context) return

    const now = Date.now()
    const {
      gameObjects,
      gameObjects: {stats},
      camera,
    } = this.props.store

    const timeSince = now - this.timeOfLastFrame

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

      const {
        uiStore,
        store: {camera},
      } = this.props

      uiStore.$size = {
        width: w,
        height: h,
      }
      camera.width = w
      camera.height = h
    })
  }
}
