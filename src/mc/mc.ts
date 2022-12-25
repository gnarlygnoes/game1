import {$Component, Div, FiendNode, s} from '../../fiend-ui/src'
import './mc.css'
import {Store} from '../store/store'

export class Mc extends $Component<{
  store: Store
}> {
  render(): FiendNode | FiendNode[] {
    const {
      mc: {
        pos: {x, y},
      },
      $angle,
    } = this.props.store

    return Div({
      className: `Mc`,
      style: s`transform: translate(${x}px, ${y}px) rotate(${$angle}deg);`,
      children: [],
    })
  }

  componentDidMount() {
    addEventListener('keydown', e => {
      console.log(e.key)

      switch (e.key) {
        case 'ArrowUp':
          break
        case 'ArrowDown':
          break
        case 'ArrowLeft':
          break
        case 'ArrowRight':
          break
      }
    })
  }
}
