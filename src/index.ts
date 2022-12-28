import './index.css'
import {$Component, c, Div, render} from '../fiend-ui/src'
import {Stage} from './stage/stage'

class Main extends $Component {
  render() {
    return Div({
      className: c`Main`,
      // children: [Stars.$({store: this.store}), Mc.$({store: this.store})],
      children: [Stage.$({})],
    })
  }
}

render(Main.$({}), document.getElementById('root')!)
