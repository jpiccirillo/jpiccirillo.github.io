/*
Author: Jeffrey Piccirillo (jpiccirillo.com; piccirilloj1 at gmail)

Data and Resources:
- Zip Code Database: https://www.unitedstateszipcodes.org/zip-code-database/
- Tooltips using turf.js: https://bl.ocks.org/TGotwig/4536d70352fc1149b437f78f61361763
- Basemap inspired from: http://bl.ocks.org/michellechandra/raw/0b2ce4923dc9b5809922/
and https://bost.ocks.org/mike/bubble-map/base.html
- Legend from: https://bl.ocks.org/mbostock/9943478
- Squares in tooltips from legend in: https://leafletjs.com/examples/choropleth/example.html
*/

//Keys of object correspond to the 'Academic Rank: 0 if none; 1=Instructor;
// 2=Asst Prof; 3=Assoc Prof; 4=Professor' column entries.

// SHADED
var tooltipColors = {
    1: {"color": "#f6eff7", "title": "Fellow"},
    2: {"color": "#bdc9e1", "title": "Instructor"},
    3: {"color": "#67a9cf", "title": "Assistant Professor"},
    4: {"color": "#1c9099", "title": "Associate Professor"},
    5: {"color": "#016c59", "title": "Professor"},
}
// QUALITATIVE
var tooltipColors = {
    1: {"color": "#e41a1c", "title": "Fellow"},
    2: {"color": "#377eb8", "title": "Instructor"},
    3: {"color": "#4daf4a", "title": "Assistant Professor"},
    4: {"color": "#984ea3", "title": "Associate Professor"},
    5: {"color": "#ff7f00", "title": "Professor"},
}

function createMap() {
    var d = $.Deferred();
    // var width = window.width;
    // var height = window.height;

    var width = 800;
    var height = 275;

    var radius = function(number) { return Math.sqrt(number) * 10;}

    // D3 Projection
    var projection = d3.geo.albersUsa()
        .translate([width / 2, height]) // translate to position on screen
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
            .style("fill", "#e1e8e4")
            .style("stroke", "#fff")
            .style("stroke-width", "1")

        // Map the cities that graduates have relocated to
        d3.csv("ALUMNI TRACKING PROJECT - MASTER WORKSHEET.csv", function(data) {
            d3.csv("us_postal_codes.csv", function(zips) {
                var collection = turf.featureCollection(points)
                data.forEach(function(val, i) {

                    const result = zips.filter(function(word) {return +word["Zip Code"] == +val.ZipCode});
                    //if it could find a matching zipcode:
                    if (result.length > 0) {
                        //set "city" for Washington University manually:
                        if (result[0]["Zip Code"] == "63110") {
                            console.log(result)
                            var info = washU.geometry.coordinates

                        } else {
                            var hometown = turf.point([+result[0]["Longitude"], +result[0]["Latitude"]]);
                            var nearest = turf.nearestPoint(hometown, collection);

                            // Look to list of smaller cities if closest large city is more than 100km away
                            // (dont want to bin with a city that's too far away)
                            if (turf.distance(hometown, nearest) > 100) {
                                var smallCities = turf.featureCollection(smaller);
                                var smallerResult = turf.nearestPoint(hometown, smallCities);
                                var info = smallerResult.geometry.coordinates;

                            } else { var info = nearest.geometry.coordinates; }
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

                var l_WidthCenter = width/2+370;

                var title = svg.append("g")
                    .attr("class", "title")
                    .attr("transform", "translate(" + (width/2 - 250) + "," + (height-230) + ")")
                    .append("text")
                        .text("Practice Locations of Washington University Otolaryngology Graduates")

                var title = svg.append("g")
                    .attr("class", "disclaimer")
                    .attr("transform", "translate(" + (l_WidthCenter+75) + "," + (height+275) + ")")
                    .append("text")
                        .text("We apologize for any oversight.  Please communicate suggestions to otoresidency@wustl.edu.")

                var legendTitle = svg.append("g")
                    .attr("transform", "translate(" + l_WidthCenter + "," + height + ")")
                    .append("text")
                        .attr("class", "legend title")
                        .text("Graduates Per City")

                var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(" + l_WidthCenter + "," + (height+90) + ")")
                  .selectAll("g")
                    .data([1, 5, 15])
                  .enter().append("g");

                legend.append("circle")
                    .attr("cy", function(d) { return -radius(d); })
                    .attr("r", radius);

                legend.append("text")
                    .attr("y", function(d) { return -2 * radius(d); })
                    .attr("dy", "1.3em")
                    .text(d3.format());

                var legend2Title = svg.append("g")
                    .attr("transform", "translate(" + l_WidthCenter + "," + (height+125) + ")")
                    .append("text")
                        .attr("class", "legend title")
                        .text("Academic Status")

                var color = d3.scale.ordinal()
                    .range(Object.keys(tooltipColors).map(
                        function(val) { return tooltipColors[val].color }));

                var r = 74,
                    p = 10;

                var legend2 = svg.append("g")
                    .attr("class", "legend2")
                    .attr("transform", "translate(" + (l_WidthCenter-35) + "," + (height+135) + ")")
                  .selectAll("g")
                    .data(color.range().slice().reverse())
                  .enter().append("g")
                    .attr("transform", function(d, i) {
                        return "translate(0," + i * 20 + ")"; });

                legend2.append("circle")
                    .attr("cy", 7)
                    .attr("r", 7)
                    .attr("class", "legend rects")
                    .style("fill", color);

                legend2.append("text")
                    .attr("x", 12)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .text(function(d, i) {
                        return tooltipColors[Object.keys(tooltipColors)[i]].title; });

            d.resolve()
            })
        })
    })
    return d.promise();
}

function createTooltip(info) {
    var content = '<strong>' + info.key  + '</strong><br>'
    console.log(info)

    //sort each city's grouped grads before creating its tooltip
    info.values.sort(function(a, b) {
        return a["Final Year in Residency Program"] - b["Final Year in Residency Program"]
    })

    $.each(info.values, function(i, val) {
        content+='<div>'
        var prof = val["Academic Rank: 0 if not ranked; 1=Fellow; 2=Instructor; 3=Asst Prof; 4=Assoc Prof; 5=Professor"]
        if (isNaN(prof) || prof=="") { prof = 0;}
        else if (prof>0) { content+='<i class="patch" style="background: ' + tooltipColors[prof].color + '"></i> '}

        content += val["First Name"].trim() +
        " "+ val["Last Name"] +
        " (" + val["Final Year in Residency Program"] + ")</div>"
    })
    return content;
}

// Create map which will take some time,
// then attach tooltips after map is made
createMap()
    .then(function() {
        tippy('.tooltip', {
            delay: 0,
            duration: 0,
            arrow: true,
            theme: 'light',
            allowTitleHTML: true,
            // trigger: 'mouseenter focus',
            trigger: 'click'
        })
    })
