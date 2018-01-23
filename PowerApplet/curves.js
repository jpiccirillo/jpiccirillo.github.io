prepare();

function remap(inputArray, newMax_X, newMax_Y) {
    oldMin_X = inputArray[0].x
    oldMin_Y = 0;
    oldMax_X = inputArray[inputArray.length - 1].x
    oldMax_Y = maxHeight($("#stdev").val(), $("#mu0").val()) * 400;
    console.log(oldMax_Y)

    for (i = 0; i < inputArray.length; i++) {
        inputArray[i].x = remapValue(inputArray[i].x, oldMin_X, oldMax_X, 0, newMax_X)
        inputArray[i].y = remapValue(inputArray[i].y, oldMin_Y, oldMax_Y, 0, newMax_Y)
    }
    console.log(inputArray)
}

function remapValue(value, low1, high1, low2, high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1)
}

function normalpdf(x, mu0, std) { //HASTINGS.  MAX ERROR = .000001
    return (Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(std) - Math.pow(x - mu0, 2) / (2 * std * std))).toFixed(7);
}

function maxHeight(std, mu0) {
    //Take std and calculate max height of page (std / sqrt(99)), save to var = maxHeight;
    std_n = std / (Math.sqrt(100))
    return normalpdf(mu0, mu0, std_n) * 1.2
}

function prepare() {
    screen_w = $(".maingraph").innerWidth()
    screen_h = $(".maingraph").innerHeight()
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val()) == 0 ? 1 : parseInt($("#samplesize").val())
    mu0 = parseInt($("#mu0").val())
    mu1 = parseInt(($("#mu1").val()) * (screen_w) / 8 / std)
    console.log(mu0, mu1, n, std)
    std_n = std / Math.sqrt(n)

    // console.log("standarddev/(sqrt(n)", std_n)
    step = 8 * std / 100
    windowHeight = maxHeight(std, mu0);
    console.log(windowHeight)

    firsthalf = [];
    i = 0;
    for (var x = mu0 - 4 * std; x < mu0 + 4 * std; x += step) {
        firsthalf[i] = {
            x: x * 20,
            y: normalpdf(x, mu0, std / (Math.sqrt(n))) * 400
        };
        i++;
    }
    remap(firsthalf, screen_w, screen_h);

    secondhalf = [];
    i = 0;
    for (var x = mu1 - 4 * std; x < mu1 + 4 * std; x += step) {
        secondhalf[i] = {
            x: x * 20,
            y: normalpdf(x, mu1, std / (Math.sqrt(n))) * 400
        };
        i++;
    }
    remap(secondhalf, screen_w, screen_h);

    for (i = 0; i < secondhalf.length; i++) {
        secondhalf[i].x = secondhalf[i].x + (mu1 - mu0)
    }

    var dist1 = d3.svg.line()
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        })
        .interpolate("cardinal");

    var dist2 = d3.svg.line()
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        })
        .interpolate("cardinal");

    var drag = d3.behavior.drag()
        .on("drag", function(d, i) {
            d.x += d3.event.dx
            d3.select(this).attr("transform", function(d, i) {
                return "translate(" + [d.x, screen_h - 20] + ") scale(1,-1)"
            })
            newmu1 = parseInt((d.x / (screen_w) * 8 * std) + mu1)
            $("#mu1").val(parseInt((mu1 + d.x) / (screen_w) * 8 * std));
        });

    //The SVG Container
    $("svg").remove()
    var svgContainer = d3.select(".maingraph").append("svg")
        .attr("width", screen_w)
        .attr("height", screen_h);


    var plot1 = svgContainer.append("path")
        .data([{
            "x": 0,
            "y": 0
        }])
        .attr("fill", "lightblue")
        .attr("stroke-width", 2)
        .attr("d", dist1(firsthalf))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")
    // .call(drag);

    var plot2 = svgContainer.append("path")
        .data([{
            "x": 10,
            "y": 30
        }])
        .attr("fill", "pink")
        .attr("stroke-width", 2)
        .attr("cursor", "move")
        .attr("d", dist2(secondhalf))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")
        .call(drag);

    var ticks = [];
    for (var i = 0; i < 9; i++) {
        ticks.push(i * screen_w / 8)
    }
    var ticknames = [];
    for (var i = -4; i < 5; i++) {
        if ((i == -4) || (i == 4)) {
            ticknames.push("") //4 standard deviations away from mu0 have blank X ticks
        } else {
            ticknames.push(i * std + mu0)
        }
    }
    //Create the Scale we will use for the Axis
    var axisScale = d3.scale.linear()
        .domain([0, screen_w])
        .range([0, screen_w]);

    //Create the Axis
    var xAxis = d3.svg.axis()
        .scale(axisScale)
        .tickValues(ticks)
        .tickFormat((d, i) => ticknames[i]);
    // .tickValues([1, 2, 3, 5, 8, 13, 21])

    //Create an SVG group Element for the Axis elements and call the xAxis function
    var xAxisGroup = svgContainer.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (screen_h - 20) + ")")
        .call(xAxis);
}
