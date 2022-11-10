// import * as d3 from "./d3.min.js";

console.log(d3);

function setupSvg(width, height) {
  var newSvg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  return newSvg;
}
export { setupSvg };
//# sourceMappingURL=util.js.map