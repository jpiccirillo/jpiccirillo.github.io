var width = 960,
    height = 136,
    cellSize = 17;

var color = d3.scaleQuantize()
    .domain([0, 7])
    .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var svg = d3.select("body")
    .selectAll("svg")
    .data(d3.range(2017, 2019))
    .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d;
    });

var rect = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .selectAll("rect")
    .data(function(d) {
        return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1));
    })
    .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) {
        return d3.timeWeek.count(d3.timeYear(d), d) * cellSize;
    })
    .attr("y", function(d) {
        return d.getDay() * cellSize;
    })
    .datum(d3.timeFormat("%Y-%m-%d"));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .selectAll("path")
    .data(function(d) {
        return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
    })
    .enter().append("path")
    .attr("d", pathMonth);

function pathMonth(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(),
        w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
        d1 = t1.getDay(),
        w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
        "H" + w0 * cellSize + "V" + 7 * cellSize +
        "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
        "H" + (w1 + 1) * cellSize + "V" + 0 +
        "H" + (w0 + 1) * cellSize + "Z";
}

function createCal(activity) {
    var d = $.Deferred();

    // d3.csv("activity_day/rt_2018-8-10|2018-08-17|activity|day.csv", function(error, csv) {
    //   if (error) throw error;
    //
    //   var data = d3.nest()
    //     .key(function(d) { return d.Date; })
    //     .rollup(function(d) {
    //         console.log(d[0]["Time Spent (seconds)"])
    //         return d[0]["Time Spent (seconds)"]; })

    const filterValue = (obj, key, value) => obj.filter(v => v[key] === value);

    d3.csv("activity_day/rt_2017-10-15|2018-08-19|activity|day.csv", function(error, csv) {
        if (error) throw error;
        // console.log(csv.slice(0, 100))
        var arr = csv.map(function(el) {
            return el.Activity;
        });
        // console.log(csv)
        var options = {
            data: [...new Set(arr)],
            list: {
                match: {
                    enabled: true
                },
                onClickEvent: function() {
                    var value = $("#provider-file").getSelectedItemData();
                    console.log("replotting with:" + value)
                    replot(value)
                }
            }
        };

        var data = d3.nest()
            .key(function(d) {
                return d.Date.substring(0, 10);
            })
            .rollup(function(d) {
                result = filterValue(d, "Activity", activity)
                // console.log(result[0])
                return (result[0] && result[0]["Time Spent (seconds)"] / 60) || 0
            })
            .object(csv);

        console.log(data)

        rect.filter(function(d) {
                return String(d) in data;
            })
            .attr("fill", function(d) {
                console.log(data[d])
                var patch = color(Math.pow(data[d], 0.33))
                return data[d]!=0 ? patch : 0;
            })
            .attr('class', 'tooltip')
            .attr('title', function(d) {
                return createTooltip(d, data)
            })
        d.resolve(options)
    });

    return d.promise();
}

function createTooltip(info, data) {
    // console.log(info)
    var parseTime = d3.timeParse("%Y-%m-%d");
    var reformat = d3.timeFormat("%a, %b %_d");
    // var newDate = parseDate(info)

    return '<strong>' + reformat(parseTime(info)) + ': </strong>' + data[info].toFixed(2)
}

function replot(activity) {
    createCal(activity)
        .then(function(options) {
            tippy('.tooltip', {
                delay: 0,
                arrow: true,
                duration: 0,
                allowTitleHTML: true,
            })
            $("#provider-file").easyAutocomplete(options);
        })
}

//initial plot and set up input search field
replot("facebook.com")
