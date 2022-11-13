import { LinkDatum, LinkPos, NodeDatum, NodePos } from "./types";

const width = 800;

const settings = {
  width,
  height: width,
  circleRadius: 40,
  nbrSteps: 50,
  circleDistance: 150,
  chargeStrength: -1000,
  xForce: -width / 2,
  yForce: -width / 2,
  circleColor: "#ccffcc",
  strokeWidth: 1.5,
  strokeColor: "#fff",
  linkColor: "#000",
  backgroundColor: "#eee",
};

const a = { id: "a", label: "Label A", x: 0, y: 0 };
const b = { id: "b", label: "Label B", x: 0, y: 0 };
const c = { id: "c", label: "Label C", x: 0, y: 0 };
const nodeDatums: NodePos[] = [a, b, c];

const linkDatums: LinkPos[] = [];
linkDatums.push({ source: a, target: b }); // Add a-b.
linkDatums.push({ source: b, target: c }); // Add b-c.
linkDatums.push({ source: c, target: a }); // Add c-a.


export { settings, nodeDatums, linkDatums };
