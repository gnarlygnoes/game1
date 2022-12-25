import {$Model, $RunInAction} from '../../fiend-ui/src'
import {McStore} from './mc-store'

export interface Position {
  x: number
  y: number
}

export class Store extends $Model {
  $pageWidth = window.innerWidth
  $pageHeight = window.innerHeight

  $starsYPosition = 0

  $angle = 0

  mc = new McStore()

  constructor() {
    super()
    super.connect()

    addEventListener('resize', () => {
      $RunInAction(() => {
        this.$pageWidth = window.innerWidth
        this.$pageHeight = window.innerHeight
      })
    })

    this.gameLoop()
  }

  timeOfLastFrame = Date.now()

  gameLoop = () => {
    const now = Date.now()
    this.update(now)

    this.timeOfLastFrame = Date.now()

    requestAnimationFrame(this.gameLoop)
  }

  update(now: number) {
    this.$starsYPosition =
      (this.$starsYPosition + 0.00002 * (now - this.timeOfLastFrame)) % 2
  }

  // moveTo(x: number, y: number) {
  //   this.faceNewLocation(x, y);
  //   this.loop(this.$mcPosition, { x, y }, Date.now());
  // }
  //
  // faceNewLocation(x2: number, y2: number) {
  //   const { x: x1, y: y1 } = this.$mcPosition;
  //
  //   this.$angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 90;
  // }
  //
  // loop(from: Position, to: Position, startTime: number) {
  //   requestAnimationFrame(() => {
  //     const progress = calcProgress(from, to, Date.now() - startTime);
  //
  //     this.$mcPosition = calcPosition(from, to, progress);
  //
  //     if (progress >= 1) {
  //       return;
  //     }
  //
  //     this.loop(from, to, startTime);
  //   });
  // }
}
