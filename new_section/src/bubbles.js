export default function(d3) {
  var width = 960,
    height = 500,
    padding = 1.5, // separation between nodes
    maxRadius = 12;
  let beingSelected = undefined;

  var n = 30, // total number of nodes
    m = 1; // number of distinct clusters

  var color = d3.scale.category10().domain(d3.range(m));

  var x = d3.scale
    .ordinal()
    .domain(d3.range(m))
    .rangeBands([0, width]);

  var nodes = d3.range(n).map(function(_, index) {
    var i = Math.floor(Math.random() * m),
      v = ((i + 1) / m) * -Math.log(Math.random());
    return {
      radius: Math.sqrt(v) * maxRadius,
      color: color(i),
      id: `_${index}`,
    };
  });
  const nodesMasterCopy = JSON.parse(JSON.stringify(nodes));

  var force = d3.layout
    .force()
    .nodes(nodes)
    .size([x.rangeBand(), height])
    .gravity(0.2)
    .charge(0)
    .friction(0.2)
    .on("tick", tick);

  var svg = d3
    .select("#entry")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

  force.start();

  var circle = svg
    .append("g")
    .attr("transform", "translate(" + x(0) + ")")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", (d) => d.radius)
    .attr("id", (d) => d.id)
    .style("fill", (d) => d.color)
    .on(
      "click",
      throttle(function(d) {
        if (beingSelected) reset();
        changeRadius(d3.select(this), d, 40);
        console.log(d);
      })
    );

  function reset() {
    if (beingSelected) {
      const originalRadius = nodesMasterCopy[beingSelected].radius;
      changeRadius(
        d3.select(`#_${beingSelected}`),
        nodes[beingSelected],
        originalRadius
      );
      nodes[beingSelected].radius = originalRadius;
      force.nodes(nodes).start();
    }
  }

  async function changeRadius(selection, d, desiredRadius) {
    const changeRequired = desiredRadius - d.radius;
    const iterations = 40;
    const changePerIteration = changeRequired / iterations;
    const dur = 8;
    let radius = d.radius;
    for (let i = 0; i < 40; i++) {
      radius += changePerIteration;
      selection
        .attr()
        .transition()
        .duration(dur)
        .attr("r", () => radius);

      await new Promise((r) => {
        setTimeout(() => {
          const index = nodes.findIndex((g) => g.index === d.index);
          beingSelected = index;
          nodes[index].radius = radius;
          force.start();
          r();
        }, dur);
      });
    }
  }
  function tick() {
    circle
      .each(collide(0.5))
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  }

  // Resolves collisions between d and all other circles.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && quad.point !== d) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + padding;
          if (l < r) {
            l = ((l - r) / l) * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return async function() {
      var context = scope || this;

      var now = +new Date(),
        args = arguments,
        event = d3.event;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(async function() {
          last = now;
          d3.event = event;
          await fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        d3.event = event;
        await fn.apply(context, args);
      }
      event.stopPropagation();
    };
  }
}
