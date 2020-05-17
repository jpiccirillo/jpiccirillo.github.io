/* 
This script handles validating most of the user input from the sliders and the
UI boxes.  When a user inputs a value through a box or a slider, it must be
confirmed to be numeric and in-bounds.  When inputting a power value, the resulting
sample size must also be confiremd within 0-100.  Other interdependent parameters
include changing delta when stdev is changed and vice versa, and recalculating
power when alpha (Type I error) or mu1 (alternative population mean) are changed.
* @Author: Jeffrey Piccirillo (piccirilloj1@gmail.com)
* @Date:   4/30/2018
* @Last Modified by: Jeffrey Piccirillo
* @Last Modified time: 4/30/18
*/

// Main Power Slider on right (grey one)
$(function () {
  $("#slider-vertical1").slider({
    orientation: "vertical",
    range: "min",
    min: validValues.n.min,
    max: validValues.n.max,
    value: parseInt($("#n").val()),
    step: 1,
    create: function (event, ui) {
      setSliderTicks(event.target);
    },

    slide: function (event, ui) {
      if (ui.value < 1) {
        return false;
      } // Freeze slider if out of bounds

      mu1 = internalmu1;
      n = ui.value; // Set internal sample size var to slider value
      power = calculatePower(internalmu1);
      setPowerSampleSize();
      plot();
    },
  });
  $(".ui-slider-range-min").css("background-color", "lightgrey");
});

/*When a user changes power through the UI box or the slider, sample size
must be calculated as function of the inputted power value as the two affect
each other.

It is possible that given a power of x, the resulting sample size y could be
outside of this tool's 0 - 100 sample size bounds.  This function returns true
if the resulting sample size is within 0 - 100, for a potential power value,
and false if not.  The tool's console displays (hopefully) helpful errors when
possible.

The potential power value additionally must be smaller than the current Alpha
value to generate meaningful results. For mu1<mu0, this function also returns
an false as the "sample calculation" is only enabled for alternative populations
with mean greater than null population mean.*/
function ssInBounds(temp_power) {
  temp_n = calcSampleSize(temp_power);
  console.log("temp_n: ", temp_n, "temp_power: ", temp_power);
  console.log("mu1: ", mu1, "mu0: ", mu0);
  if (temp_n > 100 || temp_n < 1 || temp_power < alpha || internalmu1 < mu0) {
    if ((temp_n < 1 && n > 1.5) || temp_n > 100) {
      error = "To increase power, change μ1.";
    }
    if (temp_n < 1 && n < 1.5) {
      error = validValues.n.msg;
    }
    $(".console").text(error);
    return false;
  }
  return true;
}

function checkPower(temp_power) {
  temp_power = temp_power.value;

  // First check if within bounds and is numeric
  if (
    isNaN(temp_power) ||
    temp_power < validValues.power.min ||
    temp_power > validValues.power.max
  ) {
    $("#power").val(power.toFixed(3));
    return false;
  }

  // Then check if resulting sample size is within bounds
  if (ssInBounds(temp_power)) {
    mu1 = internalmu1;
    n = temp_n;
    power = temp_power;
    setPowerSampleSize();
    plot();
    return true;
  }
  return false;
}

// Main Power Slider on right (red one)
$(function () {
  power = $("#power").val();
  $("#slider-vertical2").slider({
    orientation: "vertical",
    range: "min",
    min: validValues.power.min,
    max: validValues.power.max,
    value: 0.6,
    step: 0.001,

    slide: function (event, ui) {
      return checkPower(ui);
    },
  });
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && !isNaN(+n);
}

function setSliderTicks(el) {
  var $slider = $(el);
  $slider.find(".ui-slider-tick-mark").remove();
  for (var i = 1; i < 20; i++) {
    if ((i * 5) % 25 == 0) {
      //major ticks at 25,50,75 (% to find integrs divisible by 25)
      $('<span class="ui-slider-tick-mark_large"></span>')
        .css("bottom", i * 5 - 2 + "%")
        .appendTo(".shell");
    } else {
      $('<span class="ui-slider-tick-mark"></span>')
        .css("bottom", i * 5 - 1 + "%")
        .appendTo(".shell");
    }
  }
}

// Function to do common tasks all together in one call.  Whenever a parameter
// is changed, the following all need to happen to keep the data updated
function setPowerSampleSize() {
  $(".console").text("");
  $("#power").val(power.toFixed(3));
  $("#n").val(Math.round(n));
  $("#effectsize").val((1 - power).toFixed(3));
  $("#slider-vertical1").slider("value", n);
  $("#slider-vertical2").slider("value", power);
}

function validate(DOMElement) {
  const item = DOMElement.id;
  const { min, max, msg, precision } = validValues[item];
  let val = $("#" + item).val();
  let valid = true;
  $(".console").text("");

  if (isNaN(val) || !val) {
    val = window[item];
    valid = false;
  } else if (val < min) {
    val = min;
    valid = false;
  } else if (val > max) {
    val = max;
    valid = false;
  }

  // If invalid, notify via console and continue
  if (!valid) $(".console").text(msg);

  val = parseFloat(val);
  window[item] = val; // Set internal variable to valid value
  $("#" + item).val(val.toFixed(precision)); // Set display value with specified precision

  // Some values are based on others:
  if (["n", "mu1", "std", "alpha", "delta"].includes(item)) {
    if (item == "delta") {
      mu1 = delta * std + mu0;
      internalmu1 = mu1;
      $("#mu1").val(parseInt(mu1));
      console.log(internalmu1);
    } else {
      calcDelta(mu1);
    }

    power = calculatePower(mu1);
    setPowerSampleSize();
  }

  // If Mu or Delta are being changed, internalmu is set to the new mu1, else no
  if (item == "mu1" || item == "delta") {
    internalmu1 = mu1;
  } else mu1 = internalmu1;
  plot();
}
