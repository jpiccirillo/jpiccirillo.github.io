export default function(d3) {
  var width = document.getElementById("portfolio").clientWidth;
  var height = document.getElementById("portfolio").clientHeight;
  var vertices = [];
  d3.range(1, 10, 2).forEach(function(d) {
    vertices.push([width / 3, height * (d / 20)]);
    vertices.push([(width / 3) * 2, height * (d / 20)]);
    vertices.push([width, height * (d / 20)]);
  });
  console.log(d3);

  var voronoi = d3.geom.voronoi().clipExtent([
    [0, 0],
    [width, height],
  ]);

  var svg = d3
    .select("#entry")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "PiYG")
    .on("mousemove", function() {
      vertices[0] = d3.mouse(this);
      redraw();
    })
    .on("touchstart", touch)
    .on("touchmove", touch);

  var path = svg.append("g").selectAll("path");

  var line = d3.svg.line().interpolate("basis-closed");

  svg
    .selectAll("circle")
    .data(vertices.slice(1))
    .enter()
    .append("circle")
    .attr("transform", function(d) {
      return "translate(" + d + ")";
    })
    .attr("r", 2);

  redraw();

  function touch() {
    vertices[0] = d3.touches(this)[0];
    redraw();
  }

  function redraw() {
    path = path.data(voronoi(vertices), String);

    path.exit().remove();
    path
      .enter()
      .append("path")
      .attr("class", function(d, i) {
        return "q" + (i % 9) + "-9";
      });
    path.attr("d", function(d) {
      return line(d) + "Z";
    });

    path.order();
  }
}
