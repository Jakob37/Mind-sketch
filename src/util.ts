import { BaseType, select as d3select } from "d3";
import { LinkDatum, LinkPos, NodeDatum, NodePos } from "./types";

function setupSvg(
  svg: d3.Selection<SVGElement, any, HTMLElement, any>,
  width: number,
  height: number
) {
  console.log("width height", width, height);

  svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);
  // .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 100)
    .attr("color", "gray");
}

function ticked(
  nodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any>,
  linkGroup: d3.Selection<BaseType, LinkPos, any, any>,
  labelGroup: d3.Selection<BaseType, NodePos, any, any>
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

function spawnNode(
  source: NodeDatum,
  textElem: HTMLInputElement,
  nodeDatums: NodeDatum[],
  links: LinkDatum[]
) {
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

export { setupSvg, ticked, spawnNode };
