import { $Component, Div, FiendNode, s } from "../../fiend-ui/src";
import "./mc.css";
import { Store } from "../store";

export class Mc extends $Component<{
  store: Store;
}> {
  render(): FiendNode | FiendNode[] {
    const {
      $position: { x, y },
      $angle,
    } = this.props.store;

    return Div({
      className: `Mc`,
      style: s`transform: translate(${x}px, ${y}px) rotate(${$angle}deg);`,
      children: [],
    });
  }
}
