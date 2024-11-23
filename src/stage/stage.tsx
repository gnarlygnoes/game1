import './stage.css'
import {Store} from '../store/store'
import {UiStore} from '../ui-store'
import {time, timeEnd} from '../lib/util'
import {createElement, createRef, Custom} from "../../cottontail-js";

export class Stage extends Custom<{
  uiStore: UiStore
  store: Store
}> {
  ref = createRef<HTMLCanvasElement>()
  context: CanvasRenderingContext2D | null = null

  timeOfLastFrame = 0

  render() {
    const {
      $size: {width, height},
    } = this.props.uiStore

    return <canvas ref={this.ref} className="Stage" width={width} height={height}/>
  }

  gameLoop = (t: DOMHighResTimeStamp) => {
    const now = t
    const timeSince = now - this.timeOfLastFrame
    this.timeOfLastFrame = now

    time(this.gameLoop.name)
    const {context} = this
    if (!context) return

    const {
      gameObjects,
      gameObjects: {stats},
      camera,
    } = this.props.store

    gameObjects.update(timeSince, camera)
    camera.update()

    gameObjects.draw(context, camera)

    requestAnimationFrame(this.gameLoop)

    stats.addFrameDuration(timeSince)
    timeEnd(this.gameLoop.name)
  }

  componentDidMount() {
    const {current} = this.ref

    if (current) {
      this.context = current.getContext('2d')

      this.gameLoop(0)
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
