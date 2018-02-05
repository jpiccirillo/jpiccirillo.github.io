screen_w = $(".maingraph").innerWidth()
screen_h = $(".maingraph").innerHeight()
topscreen_h = $(".minigraph").innerHeight()
prepare();

function axisPrep() {
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

    //Create an SVG group Element for the Axis elements and call the xAxis function
    var xAxisGroup = mainContainer.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (screen_h - 20) + ")")
        .call(xAxis);
}

function horizontalScale(x) {
    var result = d3.scale.linear()
        .domain([mu0 - 4 * std, mu0 + 4 * std])
        .range([0, screen_w]);
    return result(x);
}

function generateCurve(mu, n, std) {
    var step = 8 * std / 60,
        i = 0,
        array = [],
        verticalScale = d3.scale.linear()
        //Scale vertically by mapping the max height a curve can have (pdf w n==100) to the screen height
        .domain([0, pdf(mu0, mu0, std / (Math.sqrt(100)))])
        .range([0, screen_h])

    for (var x = mu - 4 * std; x < mu + 4 * std; x += step) {
        array[i] = {
            x: horizontalScale(x),
            y: verticalScale(pdf(x, mu, std / Math.sqrt(n)))
        };
        i++;
    }
    return array;
}

function textPrep() {
    /* Create the text for each block */
    node.append("text")
        .attr("id", "smallpinktext")
        .attr("x", horizontalScale(mu1))
        .attr("y", topscreen_h / 10 * 3.5)
        .text("Alternative Population")

    mainContainer.append("text")
        .attr("id", "smallbluetext")
        .attr("x", horizontalScale(mu0))
        .attr("y", 15)
        .text("Null Population")

    mainContainer.append("text")
        .attr("id", "smallgreytext")
        .attr("x", screen_w - screen_w / 10 * 9.8)
        .attr("y", screen_h - 50)
        .text("Sampling")

    mainContainer.append("text")
        .attr("id", "smallgreytext")
        .attr("x", screen_w - screen_w / 10 * 9.8)
        .attr("y", screen_h - 35)
        .text("Distributions")
}

function alphaErrorPrep(){
    $("line").remove()
    xValue = normalcdf()
    xValue = horizontalScale(parseInt($("#mu0").val())-xValue);
    mainContainer.append("line")
            .attr("x1", xValue)
            .attr("y1", screen_h-20)
            .attr("x2", xValue)
            .attr("y2", screen_h*.1)
            .style("fill", "none")
            .style("stroke", "Navy")
            .style("stroke-width", 2)
            .style("stroke-dasharray", ("4, 4"))
}

function prepare() {
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val()) == 0 ? 1 : parseInt($("#samplesize").val())
    mu0 = parseInt($("#mu0").val())
    mu1 = parseInt($("#mu1").val())
    firsthalf_main = generateCurve(mu0, n, std); //Generate large blue curve
    firsthalf_top = generateCurve(mu0, 1.25, std); //Generate small top blue curve
    secondhalf_main = generateCurve(mu1, n, std); //Generate large red curve
    secondhalf_top = generateCurve(mu1, 1.25, std); //Generate small top pink curve

    var dist = d3.svg.line()
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        })
        .interpolate("basis");

    var drag = d3.behavior.drag()
        .on("drag", function(d) {
            d3.select("#mainpink").attr("transform", function(d) {
                d.x += d3.event.dx
                return "translate(" + [d.x, screen_h - 20] + ") scale(1,-1)"
            })
            d3.select("#smallpink").attr("transform", function(d) {
                d.x += d3.event.dx
                return "translate(" + [d.x, topscreen_h] + ") scale(1,-1)"
            })
            d3.select("#smallpinktext").attr("transform",
                "translate(" + [d.x, 0] + ")")
            $("#mu1").val(parseInt(mu1 + d.x * 8 * std / screen_w));
        });

    //The SVG Container
    $("svg").remove()
    $("path").remove()
    $("g").remove()

    mainContainer = d3.select(".maingraph").append("svg")
        .attr("width", screen_w)
        .attr("height", screen_h);

    var plot1 = mainContainer.append("path")
        .attr("id", "mainblue")
        .attr("d", dist(firsthalf_main))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")

    var plot2 = mainContainer.append("path")
        .data([{
            "x": 0,
        }])
        .attr("id", "mainpink")
        .attr("d", dist(secondhalf_main))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")
        .call(drag);

    var topContainer = d3.select(".minigraph").append("svg")
        .attr("width", screen_w)
        .attr("height", topscreen_h);

    node = d3.select("svg")
        .append('g')

    node.append("path")
        .attr("id", "smallblue")
        .attr("d", dist(firsthalf_top))
        .attr("transform", "translate(0," + topscreen_h + ") scale(1,-1)")

    var smallpink = node.append("path")
        .attr("id", "smallpink")
        .attr("d", dist(secondhalf_top))
        .attr("transform", "translate(0," + topscreen_h + ") scale(1,-1)")
        .data([{
            "x": 0,
        }])
        .call(drag)

    axisPrep();
    textPrep();
    alphaErrorPrep();
}
