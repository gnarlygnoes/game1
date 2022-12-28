import './stage.css'
import {
  $Component,
  $RunInAction,
  c,
  Canvas,
  createRef,
} from '../../fiend-ui/src'
import {Store} from '../store/store'

export class Stage extends $Component {
  store = new Store()

  ref = createRef<HTMLCanvasElement>()
  context: CanvasRenderingContext2D | null = null

  $pageWidth = window.innerWidth
  $pageHeight = window.innerHeight

  timeOfLastFrame = Date.now()

  render() {
    const {$pageWidth, $pageHeight} = this

    return Canvas({
      ref: this.ref,
      className: c`Stage`,
      width: $pageWidth,
      height: $pageHeight,
    })
  }

  gameLoop = () => {
    const now = Date.now()
    this.store.gameObjects.update(now, this.timeOfLastFrame)

    const {context, $pageWidth, $pageHeight} = this

    if (context) {
      this.store.gameObjects.draw(context, $pageWidth, $pageHeight)
    }

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
      $RunInAction(() => {
        this.$pageWidth = window.innerWidth
        this.$pageHeight = window.innerHeight
      })
    })
  }
}
