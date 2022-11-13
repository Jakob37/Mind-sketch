import { BaseType, select as d3select } from "d3";
import { settings } from "./data";
import { LinkDatum, LinkPos, NodeDatum, NodePos } from "./types";

function setupSvg(
  svg: d3.Selection<SVGElement, any, HTMLElement, any>,
  width: number,
  height: number
) {
  svg
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("rect")
    .attr("x", -width / 2)
    .attr("y", -height / 2)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", settings.backgroundColor);
}



export { setupSvg };
