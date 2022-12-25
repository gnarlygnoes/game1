import './index.css'
import {$Component, c, Div, render} from '../fiend-ui/src'
import {Mc} from './mc/mc'
import {Store} from './store/store'
import {Stars} from './stars/stars'

class Main extends $Component {
  store = new Store()

  render() {
    return Div({
      className: c`Main`,
      children: [Stars.$({store: this.store}), Mc.$({store: this.store})],
    })
  }
}

render(Main.$({}), document.getElementById('root')!)
