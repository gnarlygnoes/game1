import {$Model} from '../fiend-ui/src'
import {isTouchDevice} from './lib/util'

export class UiStore extends $Model {
  touchDevice = isTouchDevice()

  constructor() {
    super()
    super.connect()
  }

  $size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
