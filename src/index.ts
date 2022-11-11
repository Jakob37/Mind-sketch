import { setupSvg, ticked } from "./util";
import * as d3 from "d3";
import * as d3f from "d3-force";
import { BaseType } from "d3";
import { Link, LinkPos, Node, NodePos } from "./types";
import { nodeDatums, settings } from "./data";

const svg = setupSvg(settings.width, settings.height);
const textElem = document.getElementById("text-input") as HTMLInputElement;


const links: Link[] = [];

let remainingSteps = 200;

var svgGroup = svg
  .append("g")
  .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")");
var linkGroup: d3.Selection<BaseType, LinkPos, any, any> = svgGroup
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
  .force("charge", d3f.forceManyBody().strength(settings.chargeStrength))
  .force("link", d3f.forceLink(links as d3f.SimulationLinkDatum<d3f.SimulationNodeDatum>[]).distance(settings.circleDistance))
  .force("x", d3f.forceX(settings.xForce))
  .force("y", d3f.forceY(settings.yForce))
  .alphaTarget(1)
  .on("tick", function () {
    remainingSteps -= 1;
    if (remainingSteps > 0) {
      ticked(nodeGroup, linkGroup, labelGroup);
    }
  });

// restart();

// d3.timeout(function () {
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
      return settings.circleColor;
    })
    .attr("r", settings.circleRadius)
    .on("click", function (_target, node) {
      console.log("Clicking");
      spawnNode(node);
      remainingSteps = settings.nbrSteps;
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
  console.log("updateLinkGroup", updateLinkGroup);
  updateLinkGroup.exit().remove();

  // FIXME:
  // linkGroup = updateLinkGroup.enter().append("line").merge(linkGroup);

  // Update and restart the simulation.
  simulation.nodes(nodeDatums as d3f.SimulationNodeDatum[]);
  // simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

