$(window).resize(function(){
    mu1 = internalmu1;
    initScreenSize()
    plot();
    // axisPrep();
});

function startSpinningWheel() {
    setTimeout(prepare, 0);
}

function initScreenSize(){
    screen_w = $(".maingraph").innerWidth() //Establish screen space
    // console.log(screen_w);
    screen_h = $(".maingraph").innerHeight()
    // console.log(screen_h)
    topscreen_h = $(".minigraph").innerHeight()
    var mu0, mu1, internalmu1, std, n, alpha, mainContainer, topContainer, node, power; //Initialize globals
}

var interp = d3.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .curve(d3.curveBasis);

function appendText(id, anchor, movable, x, y, text) {
    var textObject = anchor.append("text")
        .attr("id", id)
        .attr("x", x)
        .attr("y", y)
        .text(text)
    if (movable) {
        textObject.data([{
            "x": 0,
        }])
    }
}

function addPath(id, type, x, width, anchor, verticiesArray, maxHeight, draggable) {
    if (verticiesArray.length > 0) {
        // console.log("Array: " + id + ",\t\tSize: " + verticiesArray.length)
    }

    var drag = d3.drag()
        .on("drag", function(d) {
            dragged(d)
        });

    if (type == "path") {
        var path = anchor.append("path")
            .attr("id", id) //Assign the shape the ID provided in id argument
            .attr("d", interp(verticiesArray)) //Shape it with the array provided
            .attr("transform", "translate(0," + maxHeight + ") scale(1,-1)") //Transform it
        if (draggable) { //For paths created with "draggable" flag, implement
            path.data([{
                    "x": 0,
                }])
                .call(drag)
        }
    } else {
        anchor.append("clipPath") // define a clip path
            .attr("id", id) // give the clipPath an ID
            .append("rect") // shape it as a rectangle
            .attr("x", x) // position the top x corner
            .attr("y", 0) // position the y-corner, always 0
            .attr("height", screen_h) // set the height
            .attr("width", width); // set the width
    }
}

function axisPrep() {
    console.log("mu0: ", mu0, "\nmu1: ", mu1)
    $(".axis").remove()
    var ticks = [];
    for (var i = 0; i < 9; i++) {
        ticks.push(i * (screen_w / 8) + 1)
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
    var axisScale = d3.scaleLinear()
        .domain([0, screen_w])
        .range([0, screen_w]);

    //Create the Axis
    var xAxis = d3.axisBottom()
        .scale(axisScale)
        .tickValues(ticks)
        .tickFormat((d, i) => ticknames[i]);

    //Create an SVG group Element for the Axis elements and call the xAxis function
    var xAxisGroup = mainContainer.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (screen_h - 20) + ")")
        .call(xAxis);
}

function screenScale(x) {
    var result = d3.scaleLinear()
        .domain([mu0 - 4 * std, mu0 + 4 * std])
        .range([0, screen_w]);
    return result(x);
}

function displayScale(x) {
    var result = d3.scaleLinear()
        .domain([0, screen_w])
        .range([mu0 - 4 * std, mu0 + 4 * std]);
    return result(x);
}

function verticalScale(y) {
    var result = d3.scaleLinear()
        //Scale vertically by mapping the max height a curve can have (pdf w n==100) to the screen height
        .domain([0, pdf(mu0, mu0, std / (Math.sqrt(100)))])
        .range([0, screen_h*1.16])
    return result(y);
}

function generateCurve(mu, n, std, l_bound, u_bound) {
    var array = []
    var step = 8 * std / 30

    for (var x = l_bound; x < u_bound; x += step) {
        array.push({
            x: screenScale(x),
            y: verticalScale(pdf(x, mu, std / Math.sqrt(n)))
        });
    }
    return array;
}

function textPrep() {
    greytextXPos = screen_w - screen_w / 10 * 9.8
    appendText("smallpinktext", topContainer, 1, screenScale(mu1), topscreen_h / 10 * 2.5, "Alternative Population")
    appendText("smallbluetext", mainContainer, "", screenScale(mu0), topscreen_h / 10 * 2.5, "Null Population")
    appendText("smallgreytext", mainContainer, "", greytextXPos, screen_h - 50, "Sampling")
    appendText("smallgreytext", mainContainer, "", greytextXPos, screen_h - 35, "Distributions")
}

function alphaErrorPrep() {
    $("line").remove()
    $("#alphaErrorBlue").remove()
    $("#rect-clip").remove()
    xValue = normalcdf()
    scaledXValue = screenScale(mu0 - xValue);

    addPath("rect-clip", "clipPath", scaledXValue, Math.abs(screen_w - scaledXValue), mainContainer, "", "", "")
    addPath("alphaErrorBlue", "path", "", "", mainContainer, firsthalf_main, screen_h - 20);

    mainContainer.append("line")
        .attr("id", "dashedLine")
        .attr("x1", scaledXValue)
        .attr("y1", screen_h - 20)
        .attr("x2", scaledXValue)
        .attr("y2", screen_h * .1)

    addPath("mainbluestroke", "path", "", "", mainContainer, firsthalf_main, screen_h - 20);

    checkOverlap()
}

function checkOverlap(mu) {
    $("#rect-clip-left").remove()
    $("#alphaErrorRed").remove();
    // std = parseInt($("#stdev").val())
    // n = parseInt($("#samplesize").val())
    // if (!internalmu1) { var mu = mu1 }
    // console.log("called checkoverlap")
    if (!mu) { var mu = internalmu1 }

    // mu1 = parseInt($("#mu1").val())
    xValue = normalcdf()
    scaledXValue = screenScale(mu0 - xValue);
    alphaError = generateCurve(mu, n, std, mu - 4 * std, mu + 4 * std);

    addPath("rect-clip-left", "clipPath", 0, scaledXValue, mainContainer, "", "", "")
    addPath("alphaErrorRed", "path", "", "", mainContainer, alphaError, screen_h - 20);

    d3.selectAll("#mainpink, #dashedLine, #alphaErrorBlue, #smallgreytext, .axis").each(function() {
        this.parentNode.appendChild(this);
    });
    // d3.selectAll(".bar").each(function() {
    //     this.parentNode.appendChild(this);
    // });
    d3.select("#mainbluestroke").each(function() {
        this.parentNode.appendChild(this);
    });
}

function calcMu() {
    mu1 = delta*std+mu0
    internalmu1 = mu1;
    $("#mu1").val(parseInt(mu1))
}

function calcDelta() {
    delta = parseFloat(((internalmu1-mu0) / std).toFixed(2))
    $("#delta").val(delta)
}

function calcStd() {
    console.log(internalmu1, mu0, delta)
    std = parseInt((internalmu1-mu0) / delta)
    if (std<1 || isNaN(std)) {console.log("calculated std is zero\n"); std = 1; calcDelta()} // the problem here is when std is 0.  set it to 1 and set delta accordingly
    console.log(std)
    $("#stdev").val(std)
}

function setValues() {
    //Validate input before setting internal variables
    //Delta, alpha error are validated in changeDelta() alphaErrorPrep()
    //Beta error is not validated as it is readonly
    // n from power: Math.ceil(Math.pow((inv(power-cdf(inv(.05/2, 0, 1), 0, 1), 0, 1) + inv(1-(.05/2), 0, 1) )*std/(mu1-mu0),2))

    mu0 = parseInt($("#mu0").val())
    mu1 = parseInt($("#mu1").val())
    internalmu1 = mu1;
    std = parseInt($("#stdev").val())
    calcDelta();
    alpha = parseFloat($("#alpha").val())
    n = parseInt($("#samplesize").val())
    calculatePower(mu1);
    //Delta is set as a function of mu0, mu1, and standard dev
}

// function recenter(){
//                 // console.log("ok")
//     $('#mainContainer').mousedown(function() {
//         if ((secondhalf_main[0].x > screen_w*.7) || (secondhalf_main[secondhalf_main.length - 1].x < 0+screen_w*.2)) {
//             internalmu1 = secondhalf_main[0].x > screen_w*.7 ? 4*std:-4*std;
//             $("#mu1").val(internalmu1)
//             // console.log("ok")
//             prepare();
//         }
//     })
// }

function calcSampleSize() {
    return Math.pow((inv(power-cdf(inv(alpha/2, 0, 1), 0, 1), 0, 1) + inv(1-(alpha/2), 0, 1) )*std/(mu1-mu0),2);
}
//calculate power without setting any values.  Used to see if power slider should be allowed to move
function testPower(mu) {
    console.log("in testPower")
    zcritical1 = inv((1-alpha/2), 0, 1);
    zcritical2 = inv(alpha/2, 0, 1);
    // console.log(mu1)
    if (mu<mu0) {noncentrality=0;} else {noncentrality = (mu-mu0)/(std/(Math.sqrt(n)))};
    return parseFloat(cdf(noncentrality-zcritical1, 0, 1 ) + cdf(zcritical2-noncentrality, 0, 1 )).toFixed(3);
}

function calculatePower(mu) {
    power = testPower(mu);
    console.log("Power: ", power)
    $("#power").val(power);
    $("#effectsize").val(parseFloat(1-power).toFixed(3));
    $("#slider-vertical2").slider("value", power)
}

function dragged(d) {
    $(".bar").remove();
    $(".console").text("")
    calcDelta();
    d3.select("#mainpink").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [d.x, screen_h - 20] + ") scale(1,-1)"
    })
    d3.select("#smallpink").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [d.x, topscreen_h] + ") scale(1,-1)"
    })
    d3.select("#smallpinktext").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [d.x, 0] + ")"
    })

    $("#mu1").val(Math.round(mu1 + d.x * 8 * std / screen_w))
    internalmu1 = mu1 + d.x * 8 * std / screen_w
    checkOverlap(internalmu1);
    calculatePower(internalmu1);
};

function plot() {
    $(".bar").remove();
    $(".console").text("")
    curveFactory()
    pathFactory()
    alphaErrorPrep();
    calculatePower(internalmu1);
    axisPrep();
    textPrep();
}

function curveFactory() {
    firsthalf_main = generateCurve(mu0, n, std, mu0 - 4 * std, mu0 + 4 * std); //Generate large blue curve
    firsthalf_top = generateCurve(mu0, 1.25, std, mu0 - 4 * std, mu0 + 4 * std); //Generate small top blue curve
    secondhalf_main = generateCurve(mu1, n, std, mu1 - 4 * std, mu1 + 4 * std); //Generate large red curve
    secondhalf_top = generateCurve(mu1, 1.25, std, mu1 - 4 * std, mu1 + 4 * std); //Generate small top pink curve
}

function pathFactory() {
    $("path").remove()
    $("text").remove()
    addPath("mainblue", "path", "", "", mainContainer, firsthalf_main, screen_h - 20);
    addPath("mainpink", "path", "", "", mainContainer, secondhalf_main, screen_h - 20, 1);
    addPath("smallblue", "path", "", "", topContainer, firsthalf_top, topscreen_h)
    addPath("smallpink", "path", "", "", topContainer, secondhalf_top, topscreen_h, 1)
}

function prepare() {
    $("#loader").remove();
    $(".container").css("display", "block");
    initScreenSize();
    setValues();
    console.log("PREPARE CALLED")
    std_n = std/Math.sqrt(n);

    mainContainer = d3.select(".maingraph").append("svg")
        .attr("id", "mainContainer")
        .attr("width", screen_w)
        .attr("height", screen_h)

    topContainer = d3.select(".minigraph").append("svg")
        .attr("width", screen_w)
        .attr("height", topscreen_h);

    // node = d3.select("svg")
    //     .append('g')

    plot();
}

function sample() {
    mu1 = internalmu1;
    plot();
    $(".bar").remove();
    var randomValues = d3.range(n).map(d3.randomNormal(internalmu1, std));
    for (i=0; i<n; i++) { randomValues[i] = screenScale(randomValues[i]) }

    var x = d3.scaleLinear()
        .domain([0, screen_w])
        .rangeRound([0, screen_w]);

    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(90))
        (randomValues);

    largestStack = d3.max(bins, function(d) { return d.length; })
    console.log(largestStack, 12)

    var max = (largestStack > 8) ? largestStack : 8;
    var y = d3.scaleLinear()
        .domain([0, max*1.5])
        .range([topscreen_h, 0]);

    var bar = topContainer.selectAll(".bar")
      .data(bins)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0) - 3)
        .attr("height", function(d) { return (topscreen_h - y(d.length)); })
        .attr("fill", "white")
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("stroke", "darkred")
        .attr("fill-opacity",.7);

    $('#smallpink').remove()
    addPath("smallpink", "path", "", "", topContainer, secondhalf_top, topscreen_h, 1)
    sampleMean = displayScale(d3.mean(randomValues));
    zvalue = (mu0-sampleMean)/(std/(Math.sqrt(n)))
    ztest = jStat.ztest(zvalue, 1)
    var message =
    "Critical Mean Value = " + displayScale(scaledXValue).toFixed(2) +
    "\nSample Mean = " + sampleMean.toFixed(2) +
    "\np(z>"+zvalue.toFixed(2) + ") = " + ztest.toFixed(4)

    if (ztest>=alpha) {
        message += "\n\nFail to Reject Ho";
        $(".console").css('color', 'Crimson');

    } else {
        message += "\n\nReject Ho";
        $(".console").css('color', 'Navy');
    }

    $(".console").text(message)
}
