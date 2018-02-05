prepare();

function axisprep() {
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
    var xAxisGroup = mainContainer.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (screen_h - 20) + ")")
        .call(xAxis);
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
    topscreen_h = $(".minigraph").innerHeight()
    std = parseInt($("#stdev").val())
    n = parseInt($("#samplesize").val()) == 0 ? 1 : parseInt($("#samplesize").val())
    mu0 = parseInt($("#mu0").val())
    mu1 = parseInt(($("#mu1").val()))
    step = 8 * std / 60
    conversion = 8*std/screen_w

    var horizontalScale_mu0 = d3.scale.linear()
        .domain([mu0 - 4 * std, mu0 + 4 * std])
        .range([0, screen_w]);
    // mu0 = horizontalScale_mu0(mu0)

    var horizontalScale_mu1 = d3.scale.linear()
        .domain([mu1 - 4 * std, mu1 + 4 * std])
        .range([0+(screen_w / 8)*(mu1-mu0)/std, screen_w + (screen_w / 8)*(mu1-mu0)/std]);
    // mu1 = horizontalScale_mu0(mu1)

    var verticalScale = d3.scale.linear()
        .domain([0, maxHeight(std,mu0)*.9])
        .range([0, screen_h]);

    firsthalf_main = [];
    firsthalf_top = [];
    i = 0;
    for (var x = mu0 - 4 * std; x < mu0 + 4 * std; x += step) {
        firsthalf_main[i] = {
            x: horizontalScale_mu0(x),
            y: verticalScale(normalpdf(x, mu0, std / Math.sqrt(n)))
        };

        firsthalf_top[i] = {
            x: horizontalScale_mu0(x),
            y: verticalScale(normalpdf(x, mu0, std / Math.sqrt(1.25)))
        };

        i++;
    }

    console.log(mu1)
    secondhalf_main = [];
    secondhalf_top = [];
    i = 0;
    for (var x = mu1 - 4 * std; x < mu1 + 4 * std; x += step) {
        // consolxe.log(horizontalScale_mu1(x))
        secondhalf_main[i] = {
            x: horizontalScale_mu1(x),
            y: verticalScale(normalpdf(x, mu1, std / Math.sqrt(n)))
        };
        secondhalf_top[i] = {
            x: horizontalScale_mu0(x),
            y: verticalScale(normalpdf(x, mu1, std / Math.sqrt(1.25)))
        };

        i++;
    }

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
            $("#mu1").val(parseInt(mu1 + d.x*conversion));
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

    var node = d3.select("svg")
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

    /* Create the text for each block */
    node.append("text")
        .attr("id", "smallpinktext")
        .attr("x", horizontalScale_mu1(mu1))
        .attr("y", topscreen_h/10*3.5)
        .text("Alternative Population")

    mainContainer.append("text")
        .attr("id", "smallbluetext")
        .attr("x", horizontalScale_mu0(mu0))
        .attr("y", 15)
        .text("Null Population")

    mainContainer.append("text")
        .attr("id", "smallgreytext")
        .attr("x", screen_w-screen_w/10*9.8)
        .attr("y", screen_h-50)
        .text("Sampling")

    mainContainer.append("text")
        .attr("id", "smallgreytext")
        .attr("x", screen_w-screen_w/10*9.8)
        .attr("y", screen_h-35)
        .text("Distributions")



    // var plot2_mini_text = d3.select("#smallpink").append("text")
    //     .attr("id", "smallpinktext")
    //     .text("hello")
    //     .attr("x", function(d) { return d.cx; })
    //     .attr("y", function(d) { return d.cy; })

    axisprep();
}
