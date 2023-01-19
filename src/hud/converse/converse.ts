import {$Component, Button, c, Div} from '../../../fiend-ui/src'
import './converse.css'

interface Prompt {
  npcText: string
  playerResponses: PlayerReponse[]
}

interface PlayerReponse {
  text: string
  next: number
}

export class Converse extends $Component {
  $showingConverse = false
  $currentPrompt = 0

  $prompt: Prompt[] = [
    {
      npcText: '0: Are you feeling lucky punk?',
      playerResponses: [
        {text: 'yes', next: 1},
        {text: 'no', next: 1},
        {text: 'leave me alone', next: 0},
      ],
    },
    {
      npcText: 'That will do little good for you',
      playerResponses: [
        {text: 'yes', next: 0},
        {text: 'no', next: 0},
        {text: 'leave me alone', next: 0},
      ],
    },
  ]

  render() {
    const {$showingConverse, $prompt} = this

    return Div({
      className: 'Converse',
      children: [
        Button({
          children: [$showingConverse ? 'Hide Converse' : 'Show Converse'],
          className: 'Converse-showButton',
          onclick: this.onClickShow,
        }),

        $showingConverse
          ? this.drawConverseControls($prompt[this.$currentPrompt])
          : null,
      ],
    })
  }

  drawConverseControls(prompt: Prompt) {
    return Div({
      className: 'Converse-controls',
      children: [
        Div({
          children: [prompt.npcText],
        }),
        Div({
          className: c`Converse-options`,
          children: prompt.playerResponses.map(this.drawOption),
        }),
      ],
    })
  }

  drawOption = (playerResponse: PlayerReponse) => {
    return Button({
      children: [playerResponse.text],
      onclick: () => {
        this.$currentPrompt = playerResponse.next
      },
    })
  }

  onClickShow = () => {
    this.$showingConverse = !this.$showingConverse
  }
}
