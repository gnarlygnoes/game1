import './style.css'
import {Stage} from './stage/stage.tsx'
import {UiStore} from './ui-store'
import {Store} from './store/store'
import {createElement, Custom, renderRoot} from "../cottontail-js";

class Main extends Custom {
  uiStore = new UiStore()
  store = new Store(this.uiStore.$size.width, this.uiStore.$size.height)

  render() {
    const {uiStore, store} = this

    return <div className="Main">
      <Stage store={store} uiStore={uiStore}/>
    </div>
  }
}

renderRoot(<Main/>, document.getElementById('root'))
