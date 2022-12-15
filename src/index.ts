import "./index.css";
import { $Component, c, Div, H1, render } from "../fiend-ui/src";

class Main extends $Component {
  render() {
    return Div({
      className: c`Main`,
      children: [H1("Hi")],
    });
  }
}

render(Main.$({}), document.getElementById("root")!);
