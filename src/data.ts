import * as d3 from "d3";
import { LinkPos, NodePos } from "./types";

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
  inactiveColor: "#cccccc",
  activeColor: "#ccccff",
  strokeWidth: 1.5,
  strokeColor: "#fff",
  linkColor: "#000",
  backgroundColor: "#eee",
};

function makeNode(label: string): NodePos {
  return makeNodeWithPos(label, settings.width / 2, settings.height / 2);
}

function makeNodeWithPos(label: string, x: number, y: number): NodePos {
  return {
    label,
    id: `id-${d3.randomUniform()}`,
    x: settings.width / 2,
    y: settings.height / 2,
    isActive: false,
  };
}

const center = makeNode("center");
const sub1 = makeNode("Sub 1");
const sub2 = makeNode("Sub 2");
const sub3 = makeNode("Sub 3");
const sub1_1 = makeNode("Sub 1-1");
const nodeDatums: NodePos[] = [center, sub1, sub2, sub3, sub1_1];

const linkDatums: LinkPos[] = [];
linkDatums.push({ source: center, target: sub1 });
linkDatums.push({ source: center, target: sub2 });
linkDatums.push({ source: center, target: sub3 });
linkDatums.push({ source: sub1, target: sub1_1 });

export { settings, nodeDatums, linkDatums, makeNodeWithPos };
