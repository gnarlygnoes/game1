import {$Component, Button, c, Div} from '../../fiend-ui/src'
import {Converse} from './converse/converse'
import './hud.css'
import {UiStore} from '../ui-store'
import {Store} from '../store/store'

export class Hud extends $Component<{uiStore: UiStore; store: Store}> {
  render() {
    return Div({
      className: c`Hud`,
      children: [this.drawShootButton(), Converse.$({})],
      oncontextmenu: this.onContextMenu,
    })
  }

  drawShootButton() {
    if (this.props.uiStore.touchDevice) {
      return Button({
        className: c`Hud-shootButton`,
        onclick: this.onClickShoot,
        children: ['Shoot'],
      })
    }
    return null
  }

  onClickShoot = () => {
    this.props.store.gameObjects.player.shoot()
  }

  // Prevent context menu on long press on mobile.
  onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
  }
}
