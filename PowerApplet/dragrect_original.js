d3.select("#addTo").remove();

var width = d3.select('.shell').node().getBoundingClientRect().width - 2,
    samplesizeheight = d3.select('.shell').node().getBoundingClientRect().height - 2,
    powerheight = d3.select('.shell').node().getBoundingClientRect().height - 2,
    dragbarw = 10;

var dragsamplesize = d3.behavior.drag()
    .origin(Object)
    .on("drag", tresizesamplesize);

var dragpower = d3.behavior.drag()
    .origin(Object)
    .on("drag", tresizepower);

var samplesize = d3.select(".shell.left").append("svg")
    .attr("width", width)
    .attr("height", samplesizeheight)

var power = d3.select(".shell.right").append("svg")
    .attr("width", width)
    .attr("height", powerheight)

var samplesizeG = samplesize.append("g")
    .data([{
        x: 0,
        y: 0
    }]);

var powerG = power.append("g")
    .data([{
        x: 0,
        y: 0
    }]);

var rectSampleSize = samplesizeG.append("rect")
    // .attr("id", "active")
    .attr("y", function(d) {
        return d.y;
    })
    .attr("height", samplesizeheight)
    .attr("width", width)
    .attr("fill", 'pink')
    .attr("cursor", "row-resize")
    .call(dragsamplesize);

var rectPower = powerG.append("rect")
    // .attr("id", "active")
    .attr("y", function(d) {
        return d.y;
    })
    .attr("height", powerheight)
    .attr("width", width)
    .attr("fill", 'grey')
    .attr("cursor", "row-resize")
    .call(dragpower);

function tresizesamplesize(d) {

    var oldy = d.y;
    console.log(d.y)
    d.y = Math.max(0, Math.min(d.y + samplesizeheight - (dragbarw / 2), d3.event.y));
    samplesizeheight = samplesizeheight + (oldy - d.y);

    rectSampleSize
        .attr("y", function(d) {
            return d.y;
        })
        .attr("height", samplesizeheight);
}

function tresizepower(d) {
    var oldy = d.y;
    console.log(d.y)
    // console.log(height)
    d.y = Math.max(0, Math.min(d.y + powerheight - (dragbarw / 2), d3.event.y));
    powerheight = powerheight + (oldy - d.y);

    rectPower
        .attr("y", function(d) {
            return d.y;
        })
        .attr("height", samplesizeheight);
}
