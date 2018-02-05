screen_w = $(".maingraph").innerWidth()
screen_h = $(".maingraph").innerHeight()
topscreen_h = $(".minigraph").innerHeight()
var mu0, mu1, std, n, step;

var smoothInterp = d3.svg.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .interpolate("basis");

var sharpInterp = d3.svg.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .interpolate("basis");

prepare();

function axisPrep() {
    $(".axis").remove()
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

function verticalScale(y) {
    var result = d3.scale.linear()
        //Scale vertically by mapping the max height a curve can have (pdf w n==100) to the screen height
        .domain([0, pdf(mu0, mu0, std / (Math.sqrt(100)))])
        .range([0, screen_h])
    return result(y);
}

function generateCurve(mu, n, step, std, l_bound, u_bound) {
    var array = []

    for (var x = l_bound; x < u_bound; x += step) {
        // years.push({operator : i})
        array.push({
            x: horizontalScale(x),
            y: verticalScale(pdf(x, mu, std / Math.sqrt(n)))
        });
    }
    return array;
}

function textPrep() {
    setValues();
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
    $("#alphaErrorBlue").remove()

    setValues();
    xValue = normalcdf()
    console.log("xValue for Blue:", xValue);
    scaledXValue = horizontalScale(mu0-xValue);

    partialShadeArray = generateCurve(mu0, n, step, std, mu0-xValue, mu0 + 3 * std)
    partialShadeArray.unshift({
                x: scaledXValue,
                y: 0
            });
    mainContainer.append("path")
        .attr("id", "alphaErrorBlue")
        .attr("d", sharpInterp(partialShadeArray))
        .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")

    mainContainer.append("path")
        .attr("id", "mainblue")
        .attr("d", sharpInterp(firsthalf_main))
        .style("fill", "none")
        .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")

    mainContainer.append("line")
            .attr("id", "dashedLine")
            .attr("x1", scaledXValue)
            .attr("y1", screen_h-20)
            .attr("x2", scaledXValue)
            .attr("y2", screen_h*.1)

    console.log($("#mu1").val());
    checkOverlap($("#mu1").val())
    axisPrep();
}

function checkOverlap(mu1){
    // var mu0 = $("#mu0").val();
    // xValue = normalcdf()
    // console.log("xValue for Red:", xValue);
    // scaledXValue = horizontalScale(mu0-xValue);
    //
    // std = parseInt($("#stdev").val())
    // n = parseInt($("#samplesize").val())
    // lowerBound = horizontalScale(mu1 - 3*std)
    // step = 8 * std / 60
    // if (lowerBound < scaledXValue){
    //     console.log("overlap occured")
    //     $("#alphaErrorRed").remove()
    //
    //     redShadeArray = generateCurve(mu1, n, step, std, mu1 - 3*std, mu0-xValue)
    //     redShadeArray.push({
    //                 x: scaledXValue-1.25,
    //                 y: verticalScale(pdf(mu0-xValue, mu1, std / Math.sqrt(n)))
    //             });
    //     redShadeArray.push({
    //                 x: scaledXValue-1.25,
    //                 y: 0
    //             });
    //     console.log(redShadeArray)
    //
    //     mainContainer.append("path")
    //         .attr("id", "alphaErrorRed")
    //         .attr("d", sharpInterp(redShadeArray))
    //         .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")
    // }
}

function setValues(){
    mu0 = parseInt($("#mu0").val())
    mu1 = parseInt($("#mu1").val())
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val())
    step = 8 * std/60
}

function prepare() {
    setValues();
    if (n<1){ n=1, $("#samplesize").val(1)} // Correction for if n is too low (slider corner case?)
    firsthalf_main = generateCurve(mu0, n, step, std, mu0 - 4 * std, mu0 + 4 * std); //Generate large blue curve
    firsthalf_top = generateCurve(mu0, 1.25, step, std, mu0 - 4 * std, mu0 + 4 * std); //Generate small top blue curve
    secondhalf_main = generateCurve(mu1, n, step, std, mu1 - 4 * std, mu1 + 4 * std); //Generate large red curve
    secondhalf_top = generateCurve(mu1, 1.25, step, std, mu1 - 4 * std, mu1 + 4 * std); //Generate small top pink curve

    var drag = d3.behavior.drag()
        .on("drag", function(d) {
            d3.select("#mainpink").attr("transform", function(d) {
                d.x += d3.event.dx
                return "translate(" + [d.x, screen_h - 20] + ") scale(1,-1)"
            })
            d3.select("#smallpink").attr("transform", function(d) {
                d.x += d3.event.dx
                $("#mu1").val(mu1 + d.x * 8 * std / screen_w);
                checkOverlap($("#mu1").val());
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
        .attr("d", smoothInterp(firsthalf_main))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")

    var plot2 = mainContainer.append("path")
        .data([{
            "x": 0,
        }])
        .attr("id", "mainpink")
        .attr("d", smoothInterp(secondhalf_main))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")
        .call(drag);

    var topContainer = d3.select(".minigraph").append("svg")
        .attr("width", screen_w)
        .attr("height", topscreen_h);

    node = d3.select("svg")
        .append('g')

    node.append("path")
        .attr("id", "smallblue")
        .attr("d", smoothInterp(firsthalf_top))
        .attr("transform", "translate(0," + topscreen_h + ") scale(1,-1)")

    var smallpink = node.append("path")
        .attr("id", "smallpink")
        .attr("d", smoothInterp(secondhalf_top))
        .attr("transform", "translate(0," + topscreen_h + ") scale(1,-1)")
        .data([{
            "x": 0,
        }])
        .call(drag)

    textPrep();
    alphaErrorPrep();
    // checkOverlap(mu1);
    axisPrep();
}
