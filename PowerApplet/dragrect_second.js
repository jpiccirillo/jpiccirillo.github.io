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
            if (ui.value<1) { return false; } // Freeze slider if out of bounds

            mu1 = internalmu1
            n = ui.value; // Set internal sample size var to slider value
            power = calculatePower(internalmu1)
            setPowerSampleSize()
            plot()
        }
    });
    $(".ui-slider-range-min").css("background-color", "lightgrey");
});

function calculatePower(mu) {
    // console.log("in testPower")
    zcritical1 = inv((1 - alpha / 2), 0, 1);
    zcritical2 = inv(alpha / 2, 0, 1);
    // console.log(mu1)
    if (mu < mu0) { noncentrality = 0;}
    else { noncentrality = (mu - mu0) / (std / (Math.sqrt(n)))};
    return parseFloat(cdf(noncentrality - zcritical1, 0, 1) + cdf(zcritical2 - noncentrality, 0, 1));
}

function ssInBounds(temp_power) {
    temp_n = calcSampleSize(temp_power)
        console.log("temp_n: ", temp_n, "temp_power: ", temp_power)
        console.log("mu1: ", mu1, "mu0: ", mu0)
    if (temp_n>100 || temp_n<1 || temp_power < alpha || internalmu1 < mu0) {
        if (((temp_n < 1) && (n>1.5)) || (temp_n>100)){ error = "To increase power, change μ1." }
        if ((temp_n < 1) && (n<1.5)) { error = validvalues[5][3] }
        $(".console").text(error);
        return false;
    }
    return true;
}

function checkPower(temp_power) {
    // If no power is given to validate, it's not sent from the slider and we
    // should pull it out of form
    if (temp_power == "form") { temp_power = parseFloat($("#power").val()) }
    // mu1 = internalmu1;
    // console.log(temp_power)

    // First check if within bounds and is numeric
    if (isNaN(temp_power) || temp_power < validvalues[6][1] ||
    temp_power > validvalues[6][2]) {
        $("#power").val(power.toFixed(3));
        return false;
    }

    // Then check if resulting sample size is within bounds
    if (ssInBounds(temp_power)) {
        mu1 = internalmu1
        // console.log(testPower(internalmu1))
        n = temp_n; power = temp_power;
        setPowerSampleSize();
        plot();
        // needCalcPower = false
        return true
    }
    // $("#power").val(power.toFixed(3));
    return false
}

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
            // Initialize some variables: dont recalc power, set power to slider value

            if (checkPower(ui.value)) { return true; }
            else { return false; }
            // if (temp_n>100 || temp_n<1 || temp_power < alpha) {

            //     console.log("TestSampleSize: ", temp_n, "Power: ", temp_power, "->SHOULD BE LOCKED")
            //     return false;
            // }
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

function setPowerSampleSize() {
    $(".console").text("")
    $("#power").val(power.toFixed(3));
    $("#n").val(Math.round(n));
    $("#effectsize").val((1-power).toFixed(3))
    $("#slider-vertical1").slider("value", n)
    $("#slider-vertical2").slider("value", power)
}

//Check to make sure item is
function validate(item) {
    var val = $("#" + item).val(); i=0; invalid = false; $(".console").text("");

    for (i=0; len = validvalues.length, i < len;i++) {
        // console.log(validvalues[i][0], item)
        if (item == validvalues[i][0]) {
            var min = validvalues[i][1], max = validvalues[i][2];
            if (isNaN(val) || !val) { val = window[item]; invalid = true; break; }
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
    if ((item=="n") || (item =="mu1") || (item=="std") || (item =="alpha")) {
        console.log("Getting here")
        power = calculatePower(mu1)

        setPowerSampleSize();
    }

    // If Mu or Delta are being changed, internalmu is set to the new mu1, else no
    if (item == "mu1" || item == "delta") { internalmu1 = mu1; }
    else { mu1 = internalmu1; }
    plot();
}
