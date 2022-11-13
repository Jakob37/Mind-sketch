import * as d3 from "d3";
import { makeNodeWithPos, settings } from "./data";
import { myDrag } from "./drag";
import { LinkDatum, LinkPos, NodePos } from "./types";

function refreshNodes(
  localNodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any>,
  nodeDatums: NodePos[],
  onNodeClick: (node: NodePos) => void,
  onNodeShiftClick: (node: NodePos) => void,
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>
) {
  let nodeDatumGroup = localNodeGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  nodeDatumGroup.exit().remove();

  const resultNodeGroup = nodeDatumGroup
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return d.isActive ? settings.activeColor : settings.inactiveColor;
    })
    .attr("r", settings.circleRadius)
    .on("click", function (click, node) {
      if (click.shiftKey) {
        onNodeShiftClick(node);
      } else {
        onNodeClick(node);
      }
    })
    .call(myDrag(simulation))
    .merge(localNodeGroup);

  return resultNodeGroup;
}

function refreshLabels(
  labelGroup: d3.Selection<SVGTextElement, NodePos, any, any>,
  nodeDatums: NodePos[]
) {
  const labelDatumGroup = labelGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  labelDatumGroup.exit().remove();
  const resultingLabelGroup = labelDatumGroup
    .enter()
    .append("text")
    .text(function (d) {
      return d.label;
    })
    .merge(labelGroup);
  return resultingLabelGroup;
}

function refreshLinks(
  linkGroup: d3.Selection<SVGLineElement, LinkPos, any, any>,
  linkDatums: LinkPos[]
) {
  const linkDatumGroup = linkGroup.data(linkDatums, function (d) {
    return d.source.id + "-" + d.target.id;
  });
  linkDatumGroup.exit().remove();
  const resultLinkGroup = linkDatumGroup
    .enter()
    .append("line")
    .merge(linkGroup);
  return resultLinkGroup;
}

function ticked(
  nodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any>,
  linkGroup: d3.Selection<d3.BaseType, LinkPos, any, any>,
  labelGroup: d3.Selection<d3.BaseType, NodePos, any, any>
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
  source: NodePos,
  textElem: HTMLInputElement,
  nodeDatums: NodePos[],
  links: LinkDatum[]
) {
  const currText = textElem.value;

  const newNode = makeNodeWithPos(
    currText != "" ? currText : "<empty>",
    source.x,
    source.y
  );
  // const source = nodes[Math.floor(Math.random() * nodes.length)];
  const newLink = { source, target: newNode };
  nodeDatums.push(newNode);
  links.push(newLink);
}

export { refreshNodes, refreshLabels, refreshLinks, ticked, spawnNode };
