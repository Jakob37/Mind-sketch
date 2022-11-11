import { LinkDatum, NodeDatum } from "./types";

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
  strokeWidth: 1.5,
  strokeColor: "#fff",
  linkColor: "#000",
};

const a = { id: "a", label: "Label A" };
const b = { id: "b", label: "Label B" };
const c = { id: "c", label: "Label C" };
const nodeDatums: NodeDatum[] = [a, b, c];

const links: LinkDatum[] = [];
links.push({ source: a, target: b }); // Add a-b.
links.push({ source: b, target: c }); // Add b-c.
links.push({ source: c, target: a }); // Add c-a.


export { settings, nodeDatums };
