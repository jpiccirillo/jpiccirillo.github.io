/*
Author: Jeffrey Piccirillo (jpiccirillo.com; piccirilloj1 at gmail)

Data and Resources:
- Zip Code Database: https://www.unitedstateszipcodes.org/zip-code-database/
- Tooltips using turf.js: https://bl.ocks.org/TGotwig/4536d70352fc1149b437f78f61361763
- Basemap inspired from: http://bl.ocks.org/michellechandra/raw/0b2ce4923dc9b5809922/
and https://bost.ocks.org/mike/bubble-map/base.html
- Legend from: https://bl.ocks.org/mbostock/9943478

*/

function createMap() {
    var d = $.Deferred();
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var radius = function(number) { return Math.sqrt(number) * 10;}

    // D3 Projection
    var projection = d3.geo.albersUsa()
        .translate([innerWidth / 2, 350]) // translate to position on screen
        .scale([1000]); // scale things down so see entire US

    // Define path generator
    var path = d3.geo.path() // path generator that will converts GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection

    //Create SVG element and append map to the SVG
    var svg = d3.select("body")
        .append("svg")

    // Append Div for tooltip to SVG
    var div = d3.select("body")
        .append("div")
        .style("opacity", 0);

    // Load GeoJSON data and merge with states data
    d3.json("us-states.json", function(json) {

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "rgb(213,222,217)")
            .style("stroke", "#fff")
            .style("stroke-width", "1")

        // Map the cities that graduates have relocated to
        d3.csv("Copy of ALUMNI TRACKING PROJECT - MASTER WORKSHEET_ZipCode.csv", function(data) {
            d3.csv("us_postal_codes.csv", function(zips) {
                var collection = turf.featureCollection(points)
                data.forEach(function(val, i) {

                    const result = zips.filter(word => +word["Zip Code"] == +val.ZipCode);
                    if (result.length>0) {
                        var hometown = turf.point([+result[0]["Longitude"],+result[0]["Latitude"]]);
                        var nearest = turf.nearestPoint(hometown, collection);

                        // Look to list of smaller cities if closest large city is more than 100km away
                        // (dont want to bin with a city that's too far away)
                        if (turf.distance(hometown, nearest) > 100) {
                            var smallCities = turf.featureCollection(smaller);
                            var smallerResult = turf.nearestPoint(hometown, smallCities);
                            var info = smallerResult.geometry.coordinates;

                        } else {
                            var info = nearest.geometry.coordinates;
                        }

                        val.lat = info[1]
                        val.lon = info[0]
                        val.city = info[2].city
                        val.state = info[2].state
                    }
                })

            groupedGrads = d3.nest()
              .key(function(d) { return d.city; })
              .entries(data);

            // Remove the entry representing zip codes that didnt match w a city,
            // d3.nest() returns this grouping w name "undefined"
            groupedGrads.splice(
                groupedGrads.findIndex(function(i) {
                    // console.log(i.key === "undefined")
                    return i.key === "undefined"
                }), 1);
              // console.log(groupedGrads)

             count = d3.nest()
              .key(function(d) { return d.city; })
              .rollup(function(v) { return v.length; })
              .entries(data);

            svg.selectAll("circle")
                .data(groupedGrads.sort(function(a, b) { return b.values.length - a.values.length; }))
                .enter()
                .append("circle")
                //cx and cy to map each circle to correct place on screen
                .attr("cx", function(d) {
                    return projection([d.values[0].lon, d.values[0].lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.values[0].lon, d.values[0].lat])[1];
                })
                // Define popup which pulls from the html title attr of the shape
                // tooltips will attach to items of class "tooltip"
                .attr('class', 'tooltip bubble')
                .attr('title', function(d) {
                    return createTooltip(d)
                })
                .attr("r", function(d) {
                    return radius(count.filter(function(size) {
                            return size.key == d.key })[0].values)
                        })

                // on mouse out return US State shape to full opacity
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })

                var title = svg.append("g")
                    .attr("class", "title")
                    .attr("transform", "translate(" + (innerWidth/2 - 250) + "," + (115) + ")")
                    .append("text").text("Practice Locations of Washington Univeristy Otolaryngology Graduates")

                var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(" + (innerWidth/2+350) + "," + (525) + ")")
                  .selectAll("g")
                    .data([1, 5, 15])
                  .enter().append("g");

              legend.append("text")
                  .attr("dy", function(d) { return -2.1* radius(20) })
                  .attr("class", "legend title")
                  .text("Graduates per City")

                legend.append("circle")
                    .attr("cy", function(d) { return -radius(d); })
                    .attr("r", radius);

                legend.append("text")
                    .attr("y", function(d) { return -2 * radius(d); })
                    .attr("dy", "1.3em")
                    .text(d3.format());

            d.resolve()
            })
        })
    })
    return d.promise();
}

function createTooltip(info) {
    var content = '<strong>' + info.key  + ':</strong><br>'

    //sort each city's grouped grads before creating its tooltip
    info.values.sort(function(a, b) {
        return a["Final Year in Program"] - b["Final Year in Program"]
    })
    $.each(info.values, function(i, val) {
        content+=val["First Name"].trim() +
        " "+ val["Last Name"] +
        " (" + val["Final Year in Program"] + ")<br>"
    })
    return content;
}

// Create map which will take some time,
// then attach tooltips after map is made
createMap()
    .then(function() {
        tippy('.tooltip', {
            delay: 0,
            arrow: true,
            duration: 0,
            allowTitleHTML: true,
            // trigger: 'mouseenter focus',
            // trigger: 'click'
        })
    })
