import { setupSvg, spawnNode, ticked } from "./util";
import * as d3 from "d3";
import * as d3f from "d3-force";
import { BaseType } from "d3";
import { LinkPos, NodePos } from "./types";
import { linkDatums, nodeDatums, settings } from "./data";
import { refreshLabels, refreshLinks, refreshNodes } from "./simulation";

const svg = d3.select("#canvas");

console.log("svg", svg);

setupSvg(
  svg as d3.Selection<SVGElement, any, HTMLElement, any>,
  // d3.select(svg) as d3.Selection<SVGElement, any, HTMLElement, any>,
  settings.width,
  settings.height
);
const textElem = document.getElementById("text-input") as HTMLInputElement;

let remainingSteps = 200;

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
    remainingSteps -= 1;
    if (remainingSteps > 0) {
      ticked(nodeGroup, linkGroup, labelGroup);
    }
  });

refreshSimulation();

function refreshSimulation() {
  console.log("Starting datums", nodeDatums);

  linkGroup = refreshLinks(linkGroup, linkDatums);
  nodeGroup = refreshNodes(nodeGroup, nodeDatums, function (node: NodePos) {
    spawnNode(node, textElem, nodeDatums, linkDatums);
    remainingSteps = settings.nbrSteps;
    refreshSimulation();
  });
  labelGroup = refreshLabels(labelGroup, nodeDatums);

  // Update and restart the simulation.
  simulation.nodes(nodeDatums as d3f.SimulationNodeDatum[]);
  simulation.alpha(1).restart();
}
