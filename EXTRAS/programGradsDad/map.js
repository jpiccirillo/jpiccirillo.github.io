/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web"
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html

Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */


//Width and height of map

function createMap() {
    var d = $.Deferred();
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    // D3 Projection
    var projection = d3.geo.albersUsa()
        .translate([innerWidth / 2, innerHeight / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US

    // Define path generator
    var path = d3.geo.path() // path generator that will convert GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection

    // Define linear scale for output
    var color = d3.scale.linear()
        .range(["rgb(213,222,217)", "rgb(69,173,168)", "rgb(84,36,55)", "rgb(217,91,67)"]);

    var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

    //Create SVG element and append map to the SVG
    var svg = d3.select("body")
        .append("svg")

    // Append Div for tooltip to SVG
    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Load GeoJSON data and merge with states data
    d3.json("us-states.json", function(json) {

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {

                // Get data value
                var value = d.properties.visited;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "rgb(213,222,217)";
                }
            });


        // Map the cities that graduates have relocated to
        d3.csv("cities-lived.csv", function(data) {
            groupedGrads = d3.nest()
              .key(function(d) { return d.place; })
              .entries(data);

             count = d3.nest()
              .key(function(d) { return d.place; })
              .rollup(function(v) { return v.length; })
              .entries(data);

            svg.selectAll("circle")
                .data(groupedGrads)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    entry = d.values[0]
                    return projection([entry.lon, entry.lat])[0];
                })
                .attr("cy", function(d) {
                    entry = d.values[0]
                    return projection([entry.lon, entry.lat])[1];
                })
                .attr('title', function(d) {
                    return createTooltip(d)
                })
                .attr('class', 'tooltip')
                .attr("r", function(d) {
                    for (var i = 0, len = count.length; i < len; i++) {
                        if (count[i].key==d.key) {
                            return Math.sqrt(count[i].values)*10
                        }
                    }
                })
                .style("fill", "#a51417")
                .style("opacity", 0.70)

                // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks"
                // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
                // .on("click", function(d) {
                // 	div.transition()
                //   	   .duration(200)
                //        .style("opacity", .9);
                //        div.text(d.place)
                //        .style("left", (d3.event.pageX) + "px")
                //        .style("top", (d3.event.pageY - 28) + "px")
                // 	   .style('border-radius', '3px')
                // 	   .style('text-align', 'left')
                //
                // })

                // fade out tooltip on mouse out
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
                d.resolve()
        });

        // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
        // var legend = d3.select("body").append("svg")
        //       			.attr("class", "legend")
        //      			.attr("width", 140)
        //     			.attr("height", 200)
        //    				.selectAll("g")
        //    				.data(color.domain().slice().reverse())
        //    				.enter()
        //    				.append("g")
        //      			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
        //
        //   	legend.append("rect")
        //    		  .attr("width", 18)
        //    		  .attr("height", 18)
        //    		  .style("fill", color);
        //
        //   	legend.append("text")
        //   		  .data(legendText)
        //       	  .attr("x", 24)
        //       	  .attr("y", 9)
        //       	  .attr("dy", ".35em")
        //       	  .text(function(d) { return d; });
    });
    return d.promise();
}

function createTooltip(info) {
    var content = '<strong>' + info.key  + ':</strong><br>'
    $.each(info.values, function(i, val) {
        console.log(val)
        content+=val.name.trim() + "<br>"
    })
    return content;
}

createMap()
    .then(function() {
        tippy('.tooltip', {
            delay: 0,
            arrow: true,
            duration: 0,
            allowTitleHTML: true,
        })
    })