import './style.css'
import {$Component, c, Div, render} from '../fiend-ui/src'
import {Stage} from './stage/stage'
import {Hud} from './hud/hud'
import {UiStore} from './ui-store'
import {Store} from './store/store'

class Main extends $Component {
  uiStore = new UiStore()
  store = new Store(this.uiStore.$size.width, this.uiStore.$size.height)

  render() {
    const {uiStore, store} = this

    return Div({
      className: c`Main`,
      children: [Stage.$({uiStore, store}), Hud.$({uiStore, store})],
    })
  }
}

render(Main.$({}), document.getElementById('root')!)
