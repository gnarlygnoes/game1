import {$Component, Div, FiendNode, s} from '../../fiend-ui/src'
import './mc.css'
import {Store} from '../store/store'

export class Mc extends $Component<{
  store: Store
}> {
  render(): FiendNode | FiendNode[] {
    const {
      mc: {pos},
    } = this.props.store

    const {
      position: {x, y},
    } = pos

    return Div({
      className: `Mc`,
      style: s`transform: translate(${x}px, ${y}px) rotate(${pos.getAngle()}deg);`,
      children: [],
    })
  }

  forward() {
    this.props.store.mc.pos.addAcceleration(1, 0)
  }

  back() {}

  left() {
    this.props.store.mc.pos.rotate(-0.1)
  }

  right() {
    this.props.store.mc.pos.rotate(0.1)
  }

  componentDidMount() {
    addEventListener('keydown', e => {
      console.log(e.key)

      switch (e.key) {
        case 'ArrowUp':
          this.forward()
          break
        case 'ArrowDown':
          this.back()
          break
        case 'ArrowLeft':
          this.left()
          break
        case 'ArrowRight':
          this.right()
          break
      }
    })
  }
}
