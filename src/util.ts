import { BaseType, select as d3select } from 'd3';
import { LinkPos, NodePos } from './types';

function setupSvg(width: number, height: number) {
  const newSvg = d3select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  return newSvg;
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


export { setupSvg, ticked };
