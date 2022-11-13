import * as d3 from "d3";
import { settings } from "./data";
import { LinkDatum, LinkPos, NodePos } from "./types";

const drag = (function () {
  const dragstarted = function (event: any, d: NodePos) {
    d3.select(this).raise().attr("stroke", "black");
  };

  function dragged(event: any, d: NodePos) {
    d3.select(this)
      .attr("cx", (d.x = event.x))
      .attr("cy", (d.y = event.y));
  }

  function dragended(event: any, d: NodePos) {
    d3.select(this).attr("stroke", null);
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
})();

function refreshNodes(
  localNodeGroup: d3.Selection<SVGCircleElement, NodePos, any, any>,
  nodeDatums: NodePos[],
  spawnNode: (node: NodePos) => void
) {
  let nodeDatumGroup = localNodeGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  nodeDatumGroup.exit().remove();

  function dragged(event: { x: number; y: number }, d: NodePos) {
    console.log("Event", event);
    d.x = event.x;
    d.y = event.y;
  }

  const resultNodeGroup = nodeDatumGroup
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return settings.circleColor;
    })
    .attr("r", settings.circleRadius)
    // .on("click", function (click, node) {
    //   if (click.shiftKey) {
    //     spawnNode(node);
    //   } else {
    //     console.log("No shift no action!");
    //   }
    // })
    .call(drag)
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

  const newNode = {
    id: `node_${nodeDatums.length}`,
    label: currText != "" ? currText : "<empty>",
    x: source.x,
    y: source.y,
  };
  // const source = nodes[Math.floor(Math.random() * nodes.length)];
  const newLink = { source, target: newNode };
  nodeDatums.push(newNode);
  links.push(newLink);
}

export { refreshNodes, refreshLabels, refreshLinks, ticked, spawnNode };
