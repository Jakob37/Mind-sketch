const svg = setupSvg();

const a = { id: "a" };
const b = { id: "b" };
const c = { id: "c" };
const nodes = [a, b, c];
const links = [];

const width = 400;
const height = 400;

var g = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var link = g
  .append("g")
  .attr("stroke", "#000")
  .attr("stroke-width", 1.5)
  .selectAll(".link");
var node = g
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll(".node");

var simulation = d3
  .forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-1000))
  .force("link", d3.forceLink(links).distance(100))
  .force("x", d3.forceX())
  .force("y", d3.forceY())
  .alphaTarget(1)
  .on("tick", function () {
    ticked(node, link);
  });

restart();

d3.timeout(function () {
  links.push({ source: a, target: b }); // Add a-b.
  links.push({ source: b, target: c }); // Add b-c.
  links.push({ source: c, target: a }); // Add c-a.
  restart();
}, 1000);

// d3.interval(
//   function () {
//     nodes.pop(); // Remove c.
//     links.pop(); // Remove c-a.
//     links.pop(); // Remove b-c.
//     restart();
//   },
//   2000,
//   d3.now()
// );

function spawnNode(source) {
    const newNode = { id: `node_${nodes.length}` };
    // const source = nodes[Math.floor(Math.random() * nodes.length)];
    const newLink = { source, target: newNode };
    nodes.push(newNode);
    links.push(newLink);
}

d3.interval(
  function () {
    // const newNode = { id: `node_${nodes.length}` };
    const source = nodes[Math.floor(Math.random() * nodes.length)];
    // const newLink = { source, target: newNode };
    // nodes.push(newNode);
    // links.push(newLink);

    spawnNode(source);

    restart();
  },
  500,
  d3.now() + 500
);

function restart() {
  // Apply the general update pattern to the nodes.
  node = node.data(nodes, function (d) {
    return d.id;
  });
  node.exit().remove();
  node = node
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return "green";
    })
    .attr("r", 8)
    .merge(node);

  // Apply the general update pattern to the links.
  link = link.data(links, function (d) {
    return d.source.id + "-" + d.target.id;
  });
  link.exit().remove();
  link = link.enter().append("line").merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked(node, link) {
  node
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });

  link
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
