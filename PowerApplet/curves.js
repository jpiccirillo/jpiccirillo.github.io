calc = 0;

$(window).resize(function(){
    prepare();
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

var interp = d3.svg.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .interpolate("basis");

function changeDelta() {
    validate("delta");
    $("#mu1").val(parseInt(delta * std + mu0));
    // prepare();
}

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

    var drag = d3.behavior.drag()
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
        .range([0, screen_h*1.16])
    return result(y);
}

function generateCurve(mu, n, std, l_bound, u_bound) {
    var array = []
    var step = 8 * std / 30

    for (var x = l_bound; x < u_bound; x += step) {
        array.push({
            x: horizontalScale(x),
            y: verticalScale(pdf(x, mu, std / Math.sqrt(n)))
        });
    }
    return array;
}

function textPrep() {
    $()
    greytextXPos = screen_w - screen_w / 10 * 9.8
    appendText("smallpinktext", node, 1, horizontalScale(mu1), topscreen_h / 10 * 2.5, "Alternative Population")
    appendText("smallbluetext", mainContainer, "", horizontalScale(mu0), topscreen_h / 10 * 2.5, "Null Population")
    appendText("smallgreytext", mainContainer, "", greytextXPos, screen_h - 50, "Sampling")
    appendText("smallgreytext", mainContainer, "", greytextXPos, screen_h - 35, "Distributions")
}

function alphaErrorPrep() {
    $("line").remove()
    $("#alphaErrorBlue").remove()
    $("#rect-clip").remove()
    xValue = normalcdf()
    scaledXValue = horizontalScale(mu0 - xValue);

    addPath("rect-clip", "clipPath", scaledXValue, Math.abs(screen_w - scaledXValue), mainContainer, "", "", "")
    addPath("alphaErrorBlue", "path", "", "", mainContainer, firsthalf_main, screen_h - 20);

    mainContainer.append("line")
        .attr("id", "dashedLine")
        .attr("x1", scaledXValue)
        .attr("y1", screen_h - 20)
        .attr("x2", scaledXValue)
        .attr("y2", screen_h * .1)

    addPath("mainbluestroke", "path", "", "", mainContainer, firsthalf_main, screen_h - 20);

    if (calc>0) {calculatePower($("#mu1").val());}
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
    scaledXValue = horizontalScale(mu0 - xValue);
    alphaError = generateCurve(mu, n, std, mu - 4 * std, mu + 4 * std);

    addPath("rect-clip-left", "clipPath", 0, scaledXValue, mainContainer, "", "", "")
    addPath("alphaErrorRed", "path", "", "", mainContainer, alphaError, screen_h - 20);

    d3.selectAll("#mainpink, #dashedLine, #alphaErrorBlue, #smallgreytext, .axis").each(function() {
        this.parentNode.appendChild(this);
    });
    d3.select("#mainbluestroke").each(function() {
        this.parentNode.appendChild(this);
    });
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
    setDelta();
    alpha = parseFloat($("#alpha").val())
    n = parseInt($("#samplesize").val())
    calculatePower(mu1);
    //Delta is set as a function of mu0, mu1, and standard dev
}

function setDelta() {
    $("#delta").val(((mu1-mu0) / std).toFixed(2))
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
    n = Math.pow((inv(power-cdf(inv(alpha/2, 0, 1), 0, 1), 0, 1) + inv(1-(alpha/2), 0, 1) )*std/(mu1-mu0),2);
    return n;

}

function calculatePower(mu) {
        // if (!mu) { var mu = internalmu1 }
    // mu1 = parseFloat($("#mu1").val())
    // console.log(mu1)
    zcritical1 = inv((1-alpha/2), 0, 1);
    zcritical2 = inv(alpha/2, 0, 1);
    // console.log(mu1)
    if (mu<mu0) {noncentrality=0;} else {noncentrality = (mu-mu0)/(std/(Math.sqrt(n)))};
    power = parseFloat(cdf(noncentrality-zcritical1, 0, 1 ) + cdf(zcritical2-noncentrality, 0, 1 )).toFixed(3);
    console.log("Power: ", power)
    $("#power").val(power);
    $("#effectsize").val(parseFloat(1-power).toFixed(3));
    $("#slider-vertical2").slider("value", power)
}

function dragged(d) {
    setDelta();
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

    $("#mu1").val(parseInt(mu1 + d.x * 8 * std / screen_w))
    internalmu1 = mu1 + d.x * 8 * std / screen_w
    checkOverlap(internalmu1);
    calculatePower(internalmu1);
};

function plot() {
    curveFactory()
    pathFactory()
    alphaErrorPrep();
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
    addPath("smallblue", "path", "", "", node, firsthalf_top, topscreen_h)
    addPath("smallpink", "path", "", "", node, secondhalf_top, topscreen_h, 1)
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

    node = d3.select("svg")
        .append('g')

    plot();
}
