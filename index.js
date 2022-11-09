const svg = setupSvg();
const textElem = document.getElementById("text-input");

console.log(textElem);

const a = { id: "a", label: "Label A" };
const b = { id: "b", label: "Label B" };
const c = { id: "c", label: "Label C" };
const nodeDatums = [a, b, c];
const links = [];

const circleRadius = 40;
const nbrSteps = 50;

const width = 400;
const height = 400;
let remainingSteps = 200;
const circleColor = "#ccffcc";

const circleDistance = 150;
const chargeStrength = -1000;

var svgGroup = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var linkGroup = svgGroup
  .append("g")
  .attr("stroke", "#000")
  .attr("stroke-width", 1.5)
  .selectAll(".link");
var nodeGroup = svgGroup
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll(".node");
var labelGroup = svgGroup
  .append("g")
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  // .attr("stroke-width", 1.5)
  .selectAll(".label");

var simulation = d3
  .forceSimulation(nodeDatums)
  .force("charge", d3.forceManyBody().strength(chargeStrength))
  .force("link", d3.forceLink(links).distance(circleDistance))
  .force("x", d3.forceX(-200))
  .force("y", d3.forceY(-200))
  .alphaTarget(1)
  .on("tick", function () {
    remainingSteps -= 1;
    if (remainingSteps > 0) {
      ticked(nodeGroup, linkGroup, labelGroup);
    }
  });

restart();

d3.timeout(function () {
  links.push({ source: a, target: b }); // Add a-b.
  links.push({ source: b, target: c }); // Add b-c.
  links.push({ source: c, target: a }); // Add c-a.
  restart();
}, 500);

function spawnNode(source) {
  const currText = textElem.value;

  const newNode = {
    id: `node_${nodeDatums.length}`,
    label: currText != "" ? currText : "<empty>",
  };
  // const source = nodes[Math.floor(Math.random() * nodes.length)];
  const newLink = { source, target: newNode };
  nodeDatums.push(newNode);
  links.push(newLink);

  console.group("Resulting", nodeDatums, links);
}

// d3.interval(
//   function () {
//     // const newNode = { id: `node_${nodes.length}` };
//     const source = nodes[Math.floor(Math.random() * nodes.length)];
//     // const newLink = { source, target: newNode };
//     // nodes.push(newNode);
//     // links.push(newLink);

//     spawnNode(source);

//     restart();
//   },
//   500,
//   d3.now() + 500
// );

function restart() {
  // Apply the general update pattern to the nodes.
  nodeGroup = nodeGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  nodeGroup.exit().remove();
  nodeGroup = nodeGroup
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return circleColor;
    })
    .attr("r", circleRadius)
    .on("click", function (_target, node) {
      console.log("Clicking");
      spawnNode(node);
      remainingSteps = nbrSteps;
      restart();
    })
    .merge(nodeGroup);

  labelGroup = labelGroup.data(nodeDatums, function (d) {
    return d.id;
  });
  labelGroup.exit().remove();
  labelGroup = labelGroup
    .enter()
    .append("text")
    .text(function (d) {
      return d.label;
    })
    .merge(labelGroup);

  // node = node
  //   .enter()
  //   .append("text")
  //   .text("test")
  //   .attr("fill", "blue")
  //   .merge(node);

  // Apply the general update pattern to the links.
  linkGroup = linkGroup.data(links, function (d) {
    return d.source.id + "-" + d.target.id;
  });
  linkGroup.exit().remove();
  linkGroup = linkGroup.enter().append("line").merge(linkGroup);

  // Update and restart the simulation.
  simulation.nodes(nodeDatums);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked(nodeGroup, linkGroup, labelGroup) {
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

function setupSvg() {
  const width = 800;
  const height = 800;

  const svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  //   svg
  //     .append("rect")
  //     .attr("x", -width / 2)
  //     .attr("y", -height / 2)
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("fill", "#F2EECB");
  return svg;
}
