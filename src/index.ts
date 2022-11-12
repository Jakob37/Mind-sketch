// import { setupSvg, spawnNode, ticked } from "./util";
import * as d3 from "d3";
// import * as d3f from "d3-force";
// import { BaseType } from "d3";
// import { LinkDatum, LinkPos, NodeDatum, NodePos } from "./types";
// import { nodeDatums, settings } from "./data";

const root = document.getElementById("root");
// const svgElem = document.createElementNS('http://www.w3.org/2000/svg','svg');
// root.appendChild(svgElem);
// const svg = d3.select(svgElem);

console.log("Printing document", document.body);

const textElem = document.getElementById("text")
console.log("Before", textElem);
textElem.textContent = "Updated!"
console.log("After", textElem);

const di = document.createElement("div")
di.innerText = "Hello";
root.appendChild(di)

root.innerHTML = "Hello test"

// const div = d

// const root = d3.select("#root")
// const svg = root.append("svg");
// console.log(body);

// const svgE = document.getElementById("canvas");
// svgE.style.width = "800";
// const svg = d3.select(svgE);
// console.log("Hello world");
// console.log("svg", svg);
// svg.attr('width', 800)
// setupSvg(
//   svg as d3.Selection<SVGElement, any, HTMLElement, any>,
//   // d3.select(svg) as d3.Selection<SVGElement, any, HTMLElement, any>,
//   settings.width,
//   settings.height
// );
// const textElem = document.getElementById("text-input") as HTMLInputElement;

// const linkDatums: LinkDatum[] = [];

// let remainingSteps = 200;

// // Set up D3 groups
// var svgGroup = svg
//   .append("g")
//   .attr(
//     "transform",
//     "translate(" + settings.width / 2 + "," + settings.height / 2 + ")"
//   );
// var linkGroup: d3.Selection<BaseType, LinkPos, any, any> = svgGroup
//   .append("g")
//   .attr("stroke", settings.linkColor)
//   .attr("stroke-width", settings.strokeWidth)
//   .selectAll(".link");
// var nodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any> = svgGroup
//   .append("g")
//   .attr("stroke", settings.strokeColor)
//   .attr("stroke-width", settings.strokeWidth)
//   .selectAll(".node");
// var labelGroup: d3.Selection<SVGTextElement, NodePos, any, any> = svgGroup
//   .append("g")
//   .attr("fill", "black")
//   .attr("text-anchor", "middle")
//   .attr("dominant-baseline", "middle")
//   .selectAll(".label");

// var simulation = d3f
//   .forceSimulation(nodeDatums as d3f.SimulationNodeDatum[])
//   .force("charge", d3f.forceManyBody().strength(settings.chargeStrength))
//   .force(
//     "link",
//     d3f
//       .forceLink(
//         linkDatums as d3f.SimulationLinkDatum<d3f.SimulationNodeDatum>[]
//       )
//       .distance(settings.circleDistance)
//   )
//   .force("x", d3f.forceX(settings.xForce))
//   .force("y", d3f.forceY(settings.yForce))
//   .alphaTarget(1)
//   .on("tick", function () {
//     remainingSteps -= 1;
//     if (remainingSteps > 0) {
//       ticked(nodeGroup, linkGroup, labelGroup);
//       // ticked(nodeGroup, linkGroup, labelGroup);
//     }
//   });

// refreshSimulation();

// function refreshSimulation() {
//   let updateNodeGroup = nodeGroup.data(nodeDatums, function (d) {
//     return d.id;
//   });
//   updateNodeGroup.exit().remove();

//   console.log("nodedatums", nodeDatums);
//   console.log("updateNodeGroup", updateNodeGroup);

//   updateNodeGroup = updateNodeGroup
//     .enter()
//     .append("circle")
//     .attr("fill", function (d) {
//       return settings.circleColor;
//     })
//     .attr("r", settings.circleRadius)
//     .on("click", function (_target, node) {
//       console.log("Clicking");
//       spawnNode(node, textElem, nodeDatums, linkDatums);
//       remainingSteps = settings.nbrSteps;
//       refreshSimulation();
//     })
//     .merge(nodeGroup);

//   // const updateLabelGroup = labelGroup.data(nodeDatums, function (d) {
//   //   return d.id;
//   // });
//   // updateLabelGroup.exit().remove();
//   // const labelPosGroup = updateLabelGroup
//   //   .enter()
//   //   .append("text")
//   //   .text(function (d) {
//   //     return d.label;
//   //   })
//   //   .merge(labelGroup);

//   // // Apply the general update pattern to the links.
//   // const updateLinkGroup = linkGroup.data(linkDatums, function (d) {
//   //   return d.source.id + "-" + d.target.id;
//   // });
//   // console.log("updateLinkGroup", updateLinkGroup);
//   // updateLinkGroup.exit().remove();

//   // FIXME:
//   // linkGroup = updateLinkGroup.enter().append("line").merge(linkGroup);

//   // Update and restart the simulation.
//   simulation.nodes(nodeDatums as d3f.SimulationNodeDatum[]);
//   // simulation.force("link").links(links);
//   simulation.alpha(1).restart();
// }
