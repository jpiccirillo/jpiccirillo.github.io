var w = 550,
    h = 350

var width = 300,
    height = 100

var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove);

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)

var newg = svg.append("g")
    .data([{
        x: width,
        y: height
    }]);

var dragrect = newg.append("rect")
    .attr("id", "rect_locked")
    .attr("x", (w-width)/2)
    .attr("y", h-height)
    .attr("height", height)
    .attr("width", width)
    // .attr("cursor", "move")
    .call(drag);

var dragrect2 = newg.append("rect")
    .attr("id", "rect_free")
    .attr("x", (w-(width/3))/2)
    .attr("y", h-(height/2))
    .attr("height", height / 2)
    .attr("width", width / 3)
    .attr("cursor", "move")
    .call(drag);

function dragmove(d) {
    d3.select(this)
        .attr("x", d.x=d3.event.x)
}
