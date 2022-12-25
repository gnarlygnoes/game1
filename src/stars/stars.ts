import './stars.css'
import {$Component, c, Canvas, createRef} from '../../fiend-ui/src'
import {Store} from '../store/store'
import {generateStars} from './star-data'

export class Stars extends $Component<{store: Store}> {
  ref = createRef<HTMLCanvasElement>()

  stars = generateStars()

  render() {
    const {
      store: {$pageWidth, $pageHeight},
    } = this.props

    return Canvas({
      className: c`Stars`,
      ref: this.ref,
      width: $pageWidth,
      height: $pageHeight,
    })
  }

  draw() {
    const {current} = this.ref

    if (current) {
      const context = current.getContext('2d')

      if (context) {
        const {
          store: {$pageWidth, $pageHeight, $starsYPosition},
        } = this.props

        context.fillStyle = `rgb(0, 0, 0)`
        context.fillRect(0, 0, $pageWidth, $pageHeight)

        this.drawStars(context, $pageWidth, $pageHeight, $starsYPosition)
      }
    }
  }

  drawStars(
    context: CanvasRenderingContext2D,
    pageWidth: number,
    pageHeight: number,
    starsYPosition: number
  ) {
    for (const {x, y, size, colour} of this.stars) {
      const currentY = (y + starsYPosition) % 2

      context.beginPath()
      context.fillStyle = colour
      context.arc(
        x * pageWidth,
        currentY * pageHeight,
        size * 5,
        0,
        Math.PI * 2
      )
      context.fill()
    }
  }

  componentDidMount() {
    this.$AutoRun(() => {
      this.draw()
    })
  }
}
