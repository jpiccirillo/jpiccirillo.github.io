export default function(d3) {
  var width = document.getElementById("portfolio").clientWidth,
    height = document.getElementById("portfolio").clientHeight,
    padding = 1.5, // separation between nodes
    maxRadius = 80;
  let beingSelected = undefined;

  // Returns index contained wn beingSelected identifier
  function getActiveBubbleIndex() {
    if (!beingSelected) return beingSelected;
    return Number(beingSelected.split("_").pop());
  }

  function activeBubbleExists() {
    console.log(beingSelected);
    return beingSelected !== undefined;
  }

  var n = 10, // total number of nodes
    m = 1; // number of distinct clusters

  var color = d3.scale.category10().domain(d3.range(m));

  var x = d3.scale
    .ordinal()
    .domain(d3.range(m))
    .rangeBands([0, width]);

  var nodes = d3.range(n).map(function(_, index) {
    var i = Math.floor(Math.random() * m);
    // v = ((i + 1) / m) * -Math.log(Math.random());
    return {
      radius: maxRadius,
      color: color(i),
      id: `_${index}`,
    };
  });
  const nodesMasterCopy = JSON.parse(JSON.stringify(nodes));

  var force = d3.layout
    .force()
    .nodes(nodes)
    .size([x.rangeBand(), height])
    .gravity(0.05)
    .charge((n) => {
      console.log(n.radius > 80);
      return n.radius > 80 ? 1000 : 0;
    })
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
        if (getActiveBubbleIndex() !== d.index) {
          reset();
          changeRadius(d3.select(this), d, 150);
        }
      })
    );

  function reset() {
    if (activeBubbleExists()) {
      const originalRadius = nodesMasterCopy[getActiveBubbleIndex()].radius;
      changeRadius(
        d3.select(`#_${getActiveBubbleIndex()}`),
        nodes[getActiveBubbleIndex()],
        originalRadius
      );
      nodes[getActiveBubbleIndex()].radius = originalRadius;
      force.nodes(nodes).start();
    }
    beingSelected = undefined;
  }

  async function changeRadius(selection, d, desiredRadius) {
    const changeRequired = desiredRadius - d.radius;
    const iterations = 80;
    const changePerIteration = changeRequired / iterations;
    const dur = 3;
    let radius = d.radius;
    const index = nodes.findIndex((g) => g.index === d.index);
    beingSelected = `index_${index}`;

    for (let i = 0; i < 80; i++) {
      radius += changePerIteration;
      selection
        .attr()
        .transition()
        .duration(dur)
        .attr("r", () => radius);

      await new Promise((r) => {
        setTimeout(() => {
          nodes[index].radius = radius;
          force.start();
          r();
        }, dur);
      });
    }
  }
  function tick() {
    circle
      .each((d) => {
        // console.log(d);
        collide(d.radius > 80 ? 0.2 : 0.05)(d);
      })
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
          var x = d.x - quad.point.x;
          var y = d.y - quad.point.y;
          var l = Math.sqrt(x * x + y * y);
          var r = d.radius + quad.point.radius + padding;
          var outOfBoundsWidth = d.x + d.radius < 135 || d.x + d.radius > width;
          var outOfBoundsHeight = d.y + d.radius < 0 || d.y + d.radius > height;

          if (l < r || outOfBoundsWidth || outOfBoundsHeight) {
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
