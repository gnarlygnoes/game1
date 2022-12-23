import "./index.css";
import { $Component, c, Div, H1, render } from "../fiend-ui/src";
import { Mc } from "./mc/mc";
import { Store } from "./store";
import { Stars } from "./stars/stars";

class Main extends $Component {
  store = new Store();

  render() {
    return Div({
      className: c`Main`,
      children: [Stars.$({ store: this.store }), Mc.$({ store: this.store })],
    });
  }

  componentDidMount(): void {
    addEventListener("mousedown", (e) => {
      this.store.moveTo(e.clientX, e.clientY);
    });
  }
}

render(Main.$({}), document.getElementById("root")!);
