import {$Component, Button, Div} from '../../../fiend-ui/src'
import './converse.css'

export class Converse extends $Component {
  $showingConverse = false

  render() {
    const {$showingConverse} = this

    return Div({
      className: 'Converse',
      children: [
        Button({
          children: [$showingConverse ? 'Hide Converse' : 'Show Converse'],
          className: 'Converse-showButton',
          onclick: this.onClickShow,
        }),
      ],
    })
  }

  onClickShow = () => {
    this.$showingConverse = !this.$showingConverse
  }
}
