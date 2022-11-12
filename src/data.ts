import { LinkDatum, NodeDatum, NodePos } from "./types";

const settings = {
  width: 800,
  height: 800,
  circleRadius: 40,
  nbrSteps: 50,
  circleDistance: 150,
  chargeStrength: -1000,
  xForce: -200,
  yForce: -200,
  circleColor: "#ccffcc",
  strokeWidth: 1.5,
  strokeColor: "#fff",
  linkColor: "#000",
};

const a = { id: "a", label: "Label A", x: 0, y: 0 };
const b = { id: "b", label: "Label B", x: 0, y: 0 };
const c = { id: "c", label: "Label C", x: 0, y: 0 };
const nodeDatums: NodePos[] = [a, b, c];

const links: LinkDatum[] = [];
links.push({ source: a, target: b }); // Add a-b.
links.push({ source: b, target: c }); // Add b-c.
links.push({ source: c, target: a }); // Add c-a.


export { settings, nodeDatums };
