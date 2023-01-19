import './index.css'
import {$Component, c, Div, render} from '../fiend-ui/src'
import {Stage} from './stage/stage'
import {Hud} from './hud/hud'

class Main extends $Component {
  render() {
    return Div({
      className: c`Main`,
      children: [Stage.$({}), Hud.$({})],
    })
  }
}

render(Main.$({}), document.getElementById('root')!)
