import { setupSvg } from "./util";
import * as d3 from "d3";
import * as d3f from "d3-force";

interface Node {
  id: string;
  label: string;
}

interface NodePos {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Link {
  source: Node;
  target: Node;
}

interface LinkPos {
  source: NodePos;
  target: NodePos;
}

const width = 400;
const height = 400;
const svg = setupSvg(width, height);
const textElem = document.getElementById("text-input") as HTMLInputElement;

console.log(textElem);

const a = { id: "a", label: "Label A" };
const b = { id: "b", label: "Label B" };
const c = { id: "c", label: "Label C" };
const nodeDatums: Node[] = [a, b, c];
const links: Link[] = [];

const circleRadius = 40;
const nbrSteps = 50;

let remainingSteps = 200;
const circleColor = "#ccffcc";

const circleDistance = 150;
const chargeStrength = -1000;

const xForce = -200;
const yForce = -200;

var svgGroup = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var linkGroup = svgGroup
  .append("g")
  .attr("stroke", "#000")
  .attr("stroke-width", 1.5)
  .selectAll(".link");
var nodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any> = svgGroup
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll(".node");
var labelGroup: d3.Selection<SVGTextElement, NodePos, any, any> = svgGroup
  .append("g")
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .selectAll(".label");

var simulation = d3f
  .forceSimulation(nodeDatums as d3f.SimulationNodeDatum[])
  .force("charge", d3f.forceManyBody().strength(chargeStrength))
  .force("link", d3f.forceLink(links as d3f.SimulationLinkDatum<d3f.SimulationNodeDatum>[]).distance(circleDistance))
  .force("x", d3f.forceX(xForce))
  .force("y", d3f.forceY(yForce))
  .alphaTarget(1)
  .on("tick", function () {
    remainingSteps -= 1;
    if (remainingSteps > 0) {
      ticked(nodeGroup, linkGroup, labelGroup);
    }
  });

// restart();

// d3.timeout(function () {
links.push({ source: a, target: b }); // Add a-b.
links.push({ source: b, target: c }); // Add b-c.
links.push({ source: c, target: a }); // Add c-a.
restart();
// }, 500);

function spawnNode(source: Node) {
  const currText = textElem.value;

  const newNode = {
    id: `node_${nodeDatums.length}`,
    label: currText != "" ? currText : "<empty>",
  };
  // const source = nodes[Math.floor(Math.random() * nodes.length)];
  const newLink = { source, target: newNode };
  nodeDatums.push(newNode);
  links.push(newLink);
}

function restart() {
  // Apply the general update pattern to the nodes.
  const updateNodeGroup = nodeGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  updateNodeGroup.exit().remove();
  const nodePosGroup = updateNodeGroup
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return circleColor;
    })
    .attr("r", circleRadius)
    .on("click", function (_target, node) {
      console.log("Clicking");
      spawnNode(node);
      remainingSteps = nbrSteps;
      restart();
    })
    .merge(nodeGroup);

  const updateLabelGroup = labelGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  updateLabelGroup.exit().remove();
  const labelPosGroup = updateLabelGroup
    .enter()
    .append("text")
    .text(function (d) {
      return d.label;
    })
    .merge(labelGroup);

  // node = node
  //   .enter()
  //   .append("text")
  //   .text("test")
  //   .attr("fill", "blue")
  //   .merge(node);

  // Apply the general update pattern to the links.
  const updateLinkGroup = linkGroup.data(links, function (d) {
    return d.source.id + "-" + d.target.id;
  });
  updateLinkGroup.exit().remove();
  linkGroup = updateLinkGroup.enter().append("line").merge(linkGroup);

  // Update and restart the simulation.
  simulation.nodes(nodeDatums as d3f.SimulationNodeDatum[]);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked(
  nodeGroup: d3.Selection<NodePos>,
  linkGroup: d3.Selection<LinkPos>,
  labelGroup: d3.Selection<NodePos>
) {
  nodeGroup
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });

  linkGroup
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

  labelGroup
    .attr("x", function (d) {
      return d.x;
    })
    .attr("y", function (d) {
      return d.y;
    });
}
