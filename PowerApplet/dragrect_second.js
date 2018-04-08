$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: parseInt($("#n").val()),
        step: 1,
        create: function(event, ui) {
            setSliderTicks(event.target);
        },

        slide: function(event, ui) {
            $(".console").text("") //Clear tool's console
            if (ui.value<1) { return false; } // Freeze slider if out of bounds
            mu1 = internalmu1, needCalcPower = true
            $("#n").val(ui.value); // Set samplesize box to slider value
            n = ui.value; // Set internal sample size var to slider value
            plot();
        }
    });
    $(".ui-slider-range-min").css("background-color", "lightgrey");
});

$(function() {
    power = $("#power").val();
    $("#slider-vertical2").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 1,
        value: .600,
        step: .001,

        slide: function(event, ui) {
            $(".console").text("") // Clear console
            // Initialize some variables: dont recalc power, set power to slider value
            mu1 = internalmu1, needCalcPower = false,
            power = ui.value, temp = calcSampleSize(), error = ""

            if (temp>100 || temp<1 || power < alpha) {
                if ((temp < 1) && (n>1.5)){ error = "To increase power, change another parameter." }
                if ((temp < 1) && (n<1.5)) { error = validvalues[5][3] }
                $(".console").text(error);
                // console.log("TestSampleSize: ", temp, "Power: ", power, "->SHOULD BE LOCKED")
                return false;
            }
            // console.log(testPower(internalmu1))
            n = temp;
            $("#power").val(ui.value);
            $("#n").val(Math.round(n));
            $("#slider-vertical1").slider("value", n)
            plot();
        }
    })
});

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n) && !isNaN(+n); }

function setSliderTicks(el) {
    var $slider = $(el);
    $slider.find('.ui-slider-tick-mark').remove();
    for (var i = 1; i < 20; i++) {
        if (i * 5 % 25 == 0) { //major ticks at 25,50,75 (% to find integrs divisible by 25)
            $('<span class="ui-slider-tick-mark_large"></span>').css('bottom', (i * 5 - 2) + '%').appendTo(".shell");
        } else {
            $('<span class="ui-slider-tick-mark"></span>').css('bottom', (i * 5 - 1) + '%').appendTo(".shell");
        }
    }
}

//Check to make sure item is
function validate(item) {
    var val = $("#" + item).val(); i=0; invalid = false; $(".console").text("");
    // console.log(val, window[item])
    // console.log("validating: " + item + " value: " + val)

    for (i=0; len = validvalues.length, i < len;i++) {
        // console.log(validvalues[i][0], item)
        if (item == validvalues[i][0]) {
            var min = validvalues[i][1], max = validvalues[i][2];
            if (isNaN(val)) { val = window[item]; invalid = true; break; }
            if (val < min) { val = min; invalid = true; break; }
            if (val > max) { val = max; invalid = true; break; }
            val = parseFloat(val); break; // If it's valid, still break out
        }
    }
    // Print error to tool's console, if present
    if (invalid) { $(".console").text(validvalues[i][3]) }
    window[item] = val; // Set internal variable to valid value
    $("#" + item).val(val.toFixed(validvalues[i][4])) // Set display value with specified precision

    // Special handling for sliders:
    if ((item=="n") || (item=="power")) {
        $(validvalues[i][5]).slider("value", val)
        $("#effectsize").val((1 - power).toFixed(3))
    }

    // If Mu or Delta are being changed, internalmu is set to the new mu1, else no
    if (item == "mu1" || item == "delta") { internalmu1 = mu1; }
    else { mu1 = internalmu1; }

    // If power or standard dev are being changed, dont recalculate power in later f(x)s
    if (item == "power" || item == "std") { needCalcPower = false; }
    else { needCalcPower = true;}

    plot();
}
