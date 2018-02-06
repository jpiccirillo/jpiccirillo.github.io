screen_w = $(".maingraph").innerWidth()
screen_h = $(".maingraph").innerHeight()
topscreen_h = $(".minigraph").innerHeight()
var mu0, mu1, internalmu1, std, n, step;

var interp = d3.svg.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .interpolate("basis");
d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        })
    };
prepare();

function axisPrep() {
    $(".axis").remove()
    var ticks = [];
    for (var i = 0; i < 9; i++) {
        ticks.push(i * (screen_w / 8)+1)
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
        .data([{
            "x": 0,
        }])

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
        .attr("z-index", "100")
        .text("Distributions")
}

function alphaErrorPrep(){
    $("line").remove()
    $("#alphaErrorBlue").remove()
    $("#rect-clip").remove()

    // setValues();
    xValue = normalcdf()
    console.log("xValue for Blue:", xValue);
    scaledXValue = horizontalScale(mu0-xValue);

            // define the clipPath
    mainContainer.append("clipPath")       // define a clip path
        .attr("id", "rect-clip") // give the clipPath an ID
      .append("rect")          // shape it as an ellipse
        .attr("x", scaledXValue)         // position the x-centre
        .attr("y", 0)         // position the y-centre
        .attr("height", screen_h)         // set the x radius
        .attr("width", screen_w-scaledXValue);         // set the y radius

    mainContainer.append("path")
        .attr("id", "alphaErrorBlue")
        .attr("d", interp(firsthalf_main))
        .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")
        .attr("clip-path", "url(#rect-clip)")

    // mainContainer.append("path")
    //     .attr("id", "mainblue")
    //     .attr("d", interp(firsthalf_main))
    //     .style("fill", "none")
    //     .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")

    mainContainer.append("line")
            .attr("id", "dashedLine")
            .attr("x1", scaledXValue)
            .attr("y1", screen_h-20)
            .attr("x2", scaledXValue)
            .attr("y2", screen_h*.1)

    checkOverlap(internalmu1)
    axisPrep();
}

function checkOverlap(mu1){
    // setValues();
    $("#rect-clip-left").remove()
    $("#alphaErrorRed").remove();
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val())
    step = 8 * std/60
    console.log(mu1)
    xValue = normalcdf()
    scaledXValue = horizontalScale(mu0-xValue);
    alphaError = generateCurve(mu1, n, step, std, mu1 - 4 * std, mu1 + 4 * std);

    mainContainer.append("clipPath")       // define a clip path
        .attr("id", "rect-clip-left") // give the clipPath an ID
      .append("rect")          // shape it as an ellipse
        .attr("x", 0)         // position the x-centre
        .attr("y", 0)         // position the y-centre
        .attr("height", screen_h)         // set the x radius
        .attr("width", scaledXValue);         // set the y radius

    mainContainer.append("path")
        .attr("id", "alphaErrorRed")
        .attr("d", interp(alphaError))
        .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")
        .attr("clip-path", "url(#rect-clip-left)")
        .data([{
            "x": 0,
        }])

    d3.selectAll("#mainpink, #dashedLine, #alphaErrorBlue, #smallgreytext, .axis").each(function() {
        this.parentNode.appendChild(this);
    });

    mainContainer.append("path")
        .attr("id", "mainbluestroke")
        .attr("d", interp(firsthalf_main))
        .style("fill", "none")
        .attr("transform", "translate(0," + (screen_h-20) + ") scale(1,-1)")

}

function setValues(){
    mu0 = parseInt($("#mu0").val())
    mu1 = parseFloat($("#mu1").val())
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val())
    step = 8 * std/60
}

function recenter(){
                // console.log("ok")
    $('#mainContainer').mousedown(function() {
        if ((secondhalf_main[0].x > screen_w*.7) || (secondhalf_main[secondhalf_main.length - 1].x < 0+screen_w*.2)) {
            internalmu1 = secondhalf_main[0].x > screen_w*.7 ? 4*std:-4*std;
            $("#mu1").val(internalmu1)
            // console.log("ok")
            prepare();
        }
    })
}


function dragged(d) {
    d3.select("#mainpink").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [parseInt(d.x), screen_h - 20] + ") scale(1,-1)"
    })
    d3.select("#smallpink").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [parseInt(d.x), topscreen_h] + ") scale(1,-1)"
    })
    d3.select("#smallpinktext").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [parseInt(d.x), 0] + ")"})

    $("#mu1").val(parseInt(mu1 + d.x * 8 * std / screen_w))
    internalmu1=mu1 + parseInt(d.x) * 8 * std / screen_w
    checkOverlap(internalmu1);
};

function prepare() {
    setValues();
    if (n<1){ n=1, $("#samplesize").val(1)} // Correction for if n is too low (slider corner case?)
    firsthalf_main = generateCurve(mu0, n, step, std, mu0 - 4 * std, mu0 + 4 * std); //Generate large blue curve
    firsthalf_top = generateCurve(mu0, 1.25, step, std, mu0 - 4 * std, mu0 + 4 * std); //Generate small top blue curve
    secondhalf_main = generateCurve(mu1, n, step, std, mu1 - 4 * std, mu1 + 4 * std); //Generate large red curve
    secondhalf_top = generateCurve(mu1, 1.25, step, std, mu1 - 4 * std, mu1 + 4 * std); //Generate small top pink curve

    //The SVG Container
    $("svg").remove()
    $("path").remove()
    $("g").remove()

    var drag = d3.behavior.drag()
        .on("drag", function(d) { dragged(d) });

    mainContainer = d3.select(".maingraph").append("svg")
        .attr("id", "mainContainer")
        .attr("width", screen_w)
        .attr("height", screen_h)
        .attr("mousedown", recenter())

    var plot1 = mainContainer.append("path")
        .attr("id", "mainblue")
        .attr("d", interp(firsthalf_main))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")

    var plot2 = mainContainer.append("path")
        .data([{
            "x": 0,
        }])
        .attr("id", "mainpink")
        .attr("d", interp(secondhalf_main))
        .attr("transform", "translate(0," + (screen_h - 20) + ") scale(1,-1)")
        .call(drag);

//     console.log(secondhalf_main[0].x)
//     console.log(secondhalf_main[secondhalf_main.length - 1].x)
// // var rating = overall_average.length > 0 ? overall_average.nodeValue : "It is empty";

    var topContainer = d3.select(".minigraph").append("svg")
        .attr("width", screen_w)
        .attr("height", topscreen_h);

    node = d3.select("svg")
        .append('g')

    node.append("path")
        .attr("id", "smallblue")
        .attr("d", interp(firsthalf_top))
        .attr("transform", "translate(0," + topscreen_h + ") scale(1,-1)")

    var smallpink = node.append("path")
        .attr("id", "smallpink")
        .attr("d", interp(secondhalf_top))
        .attr("transform", "translate(0," + topscreen_h + ") scale(1,-1)")
        .data([{
            "x": 0,
        }])
        .call(drag)

    alphaErrorPrep();
    checkOverlap(mu1);
    axisPrep();
    textPrep();
}
