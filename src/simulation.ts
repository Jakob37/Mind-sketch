import { BaseType } from "d3";
import { settings } from "./data";
import { LinkDatum, LinkPos, NodeDatum, NodePos } from "./types";

function refreshNodes(
  localNodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any>,
  nodeDatums: NodePos[],
  spawnNode: (node: NodePos) => void
) {
  let nodeDatumGroup = localNodeGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  nodeDatumGroup.exit().remove();
  const resultNodeGroup = nodeDatumGroup
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return settings.circleColor;
    })
    .attr("r", settings.circleRadius)
    .on("click", function (_target, node) {
      spawnNode(node);
    })
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
  linkGroup: d3.Selection<BaseType, LinkPos, any, any>,
  labelGroup: d3.Selection<BaseType, NodePos, any, any>
) {
  console.log("Ticking");
  nodeGroup
    .attr("cx", function (d) {
      console.log("Assingning cx", d.x);
      return d.x;
    })
    .attr("cy", function (d) {
      console.log("Assingning cy", d.y);
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

export { refreshNodes, refreshLabels, refreshLinks, ticked, spawnNode };
