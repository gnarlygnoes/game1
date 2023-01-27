import {$Component, Button, c, Div} from '../../fiend-ui/src'
import {Converse} from './converse/converse'
import './hud.css'

export class Hud extends $Component {
  render() {
    return Div({
      className: c`Hud`,
      children: [Converse.$({})],
      oncontextmenu: this.onContextMenu,
    })
  }

  // Prevent context menu on long press on mobile.
  onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
  }
}
