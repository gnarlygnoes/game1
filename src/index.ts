import "./index.css";
import { $Component, c, Div, H1, render } from "../fiend-ui/src";
import { Mc } from "./mc/mc";
import { Store } from "./store";

class Main extends $Component {
  store = new Store();

  render() {
    return Div({
      className: c`Main`,
      children: [Mc.$({ store: this.store })],
    });
  }

  componentDidMount(): void {
    addEventListener("mousedown", (e) => {
      this.store.moveTo(e.clientX, e.clientY);
    });

    // addEventListener("keydown", (e) => {
    //   switch (e.key) {
    //     case "ArrowLeft":
    //       this.$x -= 10;
    //       console.log("move left");
    //       break;
    //     case "ArrowRight":
    //       this.$x += 10;
    //       console.log("move right");
    //       break;
    //     case "ArrowUp":
    //       this.$y -= 10;
    //       console.log("move up");
    //       break;
    //     case "ArrowDown":
    //       this.$y += 10;
    //       console.log("move down");
    //       break;
    //   }
    // });
  }
}

render(Main.$({}), document.getElementById("root")!);
