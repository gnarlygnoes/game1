import "./index.css";
import { $Component, c, Div, H1, render } from "../fiend-ui/src";
import { Mc } from "./mc/mc";

class Main extends $Component {
  $x = 100;
  $y = 175;

  render() {
    const { $x, $y } = this;

    return Div({
      className: c`Main`,
      children: [Mc.$({ x: $x, y: $y })],
    });
  }

  componentDidMount(): void {
    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.$x -= 10;
          console.log("move left");
          break;
        case "ArrowRight":
          this.$x += 10;
          console.log("move right");
          break;
        case "ArrowUp":
          this.$y -= 10;
          console.log("move up");
          break;
        case "ArrowDown":
          this.$y += 10;
          console.log("move down");
          break;
      }
    });
  }
}

render(Main.$({}), document.getElementById("root")!);
