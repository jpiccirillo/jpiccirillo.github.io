function startSpinningWheel() {
    setTimeout(prepare, 0);
}

function initScreenSize(){
    screen_w = $(".maingraph").innerWidth() //Establish screen space
    console.log(screen_w);
    screen_h = $(".maingraph").innerHeight()
    console.log(screen_h)
    topscreen_h = $(".minigraph").innerHeight()
    var mu0, mu1, internalmu1, std, n, step; //Initialize globals
}

var interp = d3.svg.line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .interpolate("basis");

// prepare();
function changeDelta() {
    delta = validate("delta");
    $("#mu1").val(parseInt(delta * std + mu0));
    prepare();
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
        console.log("ID: " + id + "\n" + "Array Size Created: " + verticiesArray.length)
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
    step = 8 * std / 30

    for (var x = l_bound; x < u_bound; x += step) {
        array.push({
            x: horizontalScale(x),
            y: verticalScale(pdf(x, mu, std / Math.sqrt(n)))
        });
    }
    return array;
}

function textPrep() {
    setValues();
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
    validate("alpha");
    xValue = normalcdf()
    intermediate = mu0 - xValue
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
    calculatePower($("#mu1").val());
    checkOverlap()
    axisPrep();
}

function checkOverlap(mu) {
    $("#rect-clip-left").remove()
    $("#alphaErrorRed").remove();

    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val())
    // if (!internalmu1) { var mu = mu1 }
    if (!mu) { var mu = internalmu1 }

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
    validate("mu")
    validate("sigma")
    validate("samplesize");
    validate("power")

    mu0 = parseInt($("#mu0").val())
    mu1 = parseInt($("#mu1").val())
    internalmu1 = mu1;
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val())
    //Delta is set as a function of mu0, mu1, and standard dev
    setDelta();
}

function setDelta() {
    $("#delta").val((($("#mu1").val() - $("#mu0").val()) / $("#stdev").val()).toFixed(2))
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
function calculatePower(mu1) {
        // if (!mu) { var mu = internalmu1 }
    zcritical1 = inv((1-$("#alpha").val()/2), 0, 1);
    zcritical2 = inv($("#alpha").val()/2, 0, 1);
    noncentrality = (mu1-mu0)/(sigma/(Math.sqrt(n)))
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
        return "translate(" + [parseInt(d.x), screen_h - 20] + ") scale(1,-1)"
    })
    d3.select("#smallpink").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [parseInt(d.x), topscreen_h] + ") scale(1,-1)"
    })
    d3.select("#smallpinktext").attr("transform", function(d) {
        d.x += d3.event.dx
        return "translate(" + [parseInt(d.x), 0] + ")"
    })

    $("#mu1").val(parseInt(mu1 + d.x * 8 * std / screen_w))
    internalmu1 = mu1 + d.x * 8 * std / screen_w
    checkOverlap(internalmu1);
    calculatePower(internalmu1);
};
//
function prepare() {
    $("#loader").remove();
    $(".container").css("display", "block");
    initScreenSize();
    setValues();

    std_n = std/Math.sqrt(n);

    firsthalf_main = generateCurve(mu0, n, std, mu0 - 4 * std, mu0 + 4 * std); //Generate large blue curve
    firsthalf_top = generateCurve(mu0, 1.25, std, mu0 - 4 * std, mu0 + 4 * std); //Generate small top blue curve
    secondhalf_main = generateCurve(mu1, n, std, mu1 - 4 * std, mu1 + 4 * std); //Generate large red curve
    secondhalf_top = generateCurve(mu1, 1.25, std, mu1 - 4 * std, mu1 + 4 * std); //Generate small top pink curve

    //The SVG Container
    $("svg").remove()
    $("path").remove()
    $("g").remove()

    var drag = d3.behavior.drag()
        .on("drag", function(d) {
            dragged(d)
        });

    mainContainer = d3.select(".maingraph").append("svg")
        .attr("id", "mainContainer")
        .attr("width", screen_w)
        .attr("height", screen_h)
    // .attr("mousedown", recenter())

    addPath("mainblue", "path", "", "", mainContainer, firsthalf_main, screen_h - 20);
    addPath("mainpink", "path", "", "", mainContainer, secondhalf_main, screen_h - 20, 1);

    var topContainer = d3.select(".minigraph").append("svg")
        .attr("width", screen_w)
        .attr("height", topscreen_h);

    node = d3.select("svg")
        .append('g')

    addPath("smallblue", "path", "", "", node, firsthalf_top, topscreen_h)
    addPath("smallpink", "path", "", "", node, secondhalf_top, topscreen_h, 1)

    alphaErrorPrep();
    // console.log(blankarray)
    // powerresult =  1-jStat.ztest(Math.sqrt((n*Math.pow(mu0-mu1,2))/(2*Math.pow(std_n, 2))) - Math.abs(inv(0.025, 0, 1)), 1)
    // powerresult =powerresult, 1)
    // checkOverlap(mu1);
    axisPrep();
    textPrep();
}
