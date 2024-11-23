import {isTouchDevice} from './lib/util'
import {init$} from "../cottontail-js";

export class UiStore {
  touchDevice = isTouchDevice()

  constructor() {
    init$(this)
  }

  $size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
