import { settings } from "./data";
import { LinkPos, NodePos } from "./types";
import { spawnNode } from "./util";

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

export { refreshNodes, refreshLabels, refreshLinks };
