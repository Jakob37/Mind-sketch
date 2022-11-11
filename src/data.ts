import { Link, Node } from "./types";

const settings = {
  width: 400,
  height: 400,
  circleRadius: 40,
  nbrSteps: 50,
  circleDistance: 150,
  chargeStrength: -1000,
  xForce: -200,
  yForce: -200,
  circleColor: "#ccffcc",
};

const a = { id: "a", label: "Label A" };
const b = { id: "b", label: "Label B" };
const c = { id: "c", label: "Label C" };
const nodeDatums: Node[] = [a, b, c];

const links: Link[] = [];
links.push({ source: a, target: b }); // Add a-b.
links.push({ source: b, target: c }); // Add b-c.
links.push({ source: c, target: a }); // Add c-a.


export { settings, nodeDatums };
