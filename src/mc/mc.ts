import { $Component, Div, FiendNode, s } from "../../fiend-ui/src";
import "./mc.css";

export class Mc extends $Component<{
  x: number;
  y: number;
}> {
  render(): FiendNode | FiendNode[] {
    const { x, y } = this.props;

    return Div({
      className: `Mc`,
      style: s`transform: translate(${x}px, ${y}px);`,
      children: [],
    });
  }
}
