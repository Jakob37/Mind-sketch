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

const center = { id: "a", label: "Center", x: 0, y: 0 };
const sub1 = { id: "b", label: "Sub 1", x: 0, y: 0 };
const sub2 = { id: "c", label: "Sub 2", x: 0, y: 0 };
const sub3 = { id: "d", label: "Sub 3", x: 0, y: 0 };
const sub1_1 = { id: "e", label: "Sub 1-1", x: 0, y: 0 };
const nodeDatums: NodePos[] = [center, sub1, sub2, sub3, sub1_1];

const linkDatums: LinkPos[] = [];
linkDatums.push({ source: center, target: sub1 });
linkDatums.push({ source: center, target: sub2 });
linkDatums.push({ source: center, target: sub3 });
linkDatums.push({ source: sub1, target: sub1_1 });


export { settings, nodeDatums, linkDatums };
