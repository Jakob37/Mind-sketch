import { setupSvg } from "./util.js";
// import * as d3 from "./d3-force.min.js";
var width = 400;
var height = 400;
var svg = setupSvg(width, height);
var textElem = document.getElementById("text-input");
console.log(textElem);
var a = { id: "a", label: "Label A" };
var b = { id: "b", label: "Label B" };
var c = { id: "c", label: "Label C" };
var nodeDatums = [a, b, c];
var links = [];
var circleRadius = 40;
var nbrSteps = 50;
var remainingSteps = 200;
var circleColor = "#ccffcc";
var circleDistance = 150;
var chargeStrength = -1000;
var xForce = -200;
var yForce = -200;
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
    .selectAll(".label");
var simulation = d3
    .forceSimulation(nodeDatums)
    .force("charge", d3.forceManyBody().strength(chargeStrength))
    .force("link", d3.forceLink(links).distance(circleDistance))
    .force("x", d3.forceX(xForce))
    .force("y", d3.forceY(yForce))
    .alphaTarget(1)
    .on("tick", function () {
    remainingSteps -= 1;
    if (remainingSteps > 0) {
        ticked(nodeGroup, linkGroup, labelGroup);
    }
});
// restart();
// d3.timeout(function () {
links.push({ source: a, target: b }); // Add a-b.
links.push({ source: b, target: c }); // Add b-c.
links.push({ source: c, target: a }); // Add c-a.
restart();
// }, 500);
function spawnNode(source) {
    var currText = textElem.value;
    var newNode = {
        id: "node_".concat(nodeDatums.length),
        label: currText != "" ? currText : "<empty>",
    };
    // const source = nodes[Math.floor(Math.random() * nodes.length)];
    var newLink = { source: source, target: newNode };
    nodeDatums.push(newNode);
    links.push(newLink);
}
function restart() {
    // Apply the general update pattern to the nodes.
    var updateNodeGroup = nodeGroup.data(nodeDatums, function (d) {
        return d.id;
    });
    updateNodeGroup.exit().remove();
    var nodePosGroup = updateNodeGroup
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
    var updateLabelGroup = labelGroup.data(nodeDatums, function (d) {
        return d.id;
    });
    updateLabelGroup.exit().remove();
    var labelPosGroup = updateLabelGroup
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
    var updateLinkGroup = linkGroup.data(links, function (d) {
        return d.source.id + "-" + d.target.id;
    });
    updateLinkGroup.exit().remove();
    linkGroup = updateLinkGroup.enter().append("line").merge(linkGroup);
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
//# sourceMappingURL=index.js.map