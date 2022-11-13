import { setupSvg } from "./util";
import * as d3 from "d3";
import * as d3f from "d3-force";
import { BaseType, dsvFormat } from "d3";
import { LinkPos, NodePos } from "./types";
import { linkDatums, nodeDatums, settings } from "./data";
import {
  refreshLabels,
  refreshLinks,
  refreshNodes,
  spawnNode,
  ticked,
} from "./simulation";

const svg = d3.select("#canvas") as d3.Selection<
  SVGSVGElement,
  any,
  HTMLElement,
  any
>;

console.log("svg", svg);

setupSvg(
  svg as d3.Selection<SVGElement, any, HTMLElement, any>,
  // d3.select(svg) as d3.Selection<SVGElement, any, HTMLElement, any>,
  settings.width,
  settings.height
);
const textElem = document.getElementById("text-input") as HTMLInputElement;

// let remainingSteps = 100000000;

// Set up D3 groups
var svgGroup = svg
  .append("g")
  .attr(
    "transform",
    "translate(" + settings.width / 2 + "," + settings.height / 2 + ")"
  );
var linkGroup: d3.Selection<SVGLineElement, LinkPos, any, any> = svgGroup
  .append("g")
  .attr("stroke", settings.linkColor)
  .attr("stroke-width", settings.strokeWidth)
  .selectAll(".link");
var nodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any> = svgGroup
  .append("g")
  .attr("stroke", settings.strokeColor)
  .attr("stroke-width", settings.strokeWidth)
  .selectAll(".node");
var labelGroup: d3.Selection<SVGTextElement, NodePos, any, any> = svgGroup
  .append("g")
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .selectAll(".label");

// function dragStart() {
//   d3.select(this).classed("fixed", true);
// }

// function dragged(event, d: NodePos) {
//   d.fx = clamp(event.x, 0, settings.width);
//   d.fy = clamp(event.y, 0, settings.height);
//   simulation.alpha(1).restart();
// }

// function clamp(val: number, lowBound: number, highBound: number) {
//   return val < lowBound ? lowBound : val > highBound ? highBound : val;
// }

// const dragForce = d3.drag().on("start", dragStart).on("drag", dragged);

var simulation = d3f
  .forceSimulation(nodeDatums as d3f.SimulationNodeDatum[])
  .force("charge", d3f.forceManyBody().strength(settings.chargeStrength))
  .force(
    "link",
    d3f
      .forceLink(
        linkDatums as d3f.SimulationLinkDatum<d3f.SimulationNodeDatum>[]
      )
      .distance(settings.circleDistance)
  )
  .force("x", d3f.forceX(settings.xForce))
  .force("y", d3f.forceY(settings.yForce))
  .alphaTarget(1)
  .on("tick", function () {
    // remainingSteps -= 1;
    // if (remainingSteps > 0) {
    ticked(nodeGroup, linkGroup, labelGroup);
    // }
  });

// function dragsubject() {
//   return simulation.find(d3.event.x, d3.event.y);
// }

// svg.call(
//   d3
//     .drag()
//     .container(svg.node)
//     .subject(dragsubject)
//     .on("start", dragstarted)
//     .on("drag", dragged)
//     .on("end", dragended)
// );

refreshSimulation();

function refreshSimulation() {
  console.log("Starting datums", nodeDatums);

  linkGroup = refreshLinks(linkGroup, linkDatums);
  const onNodeClick = function (node: NodePos) {
    spawnNode(node, textElem, nodeDatums, linkDatums);
    // remainingSteps = settings.nbrSteps;
    refreshSimulation();
  };
  nodeGroup = refreshNodes(nodeGroup, nodeDatums, onNodeClick, simulation);
  labelGroup = refreshLabels(labelGroup, nodeDatums);

  // Update and restart the simulation.
  simulation.nodes(nodeDatums as d3f.SimulationNodeDatum[]);
  simulation.alpha(1).restart();
}
