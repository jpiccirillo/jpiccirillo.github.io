import $ from "jquery";
import { validValues } from "./validValues";
import { output } from "./curves";
import { channel } from "./curves";
import { calculateValue } from "./calculations";

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

// Main Sample size Slider on right (grey one)

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

// Main Power Slider on right (red one)

export function setSliderTicks(el) {
  $(el)
    .find(".ui-slider-tick-mark")
    .remove();
  for (let i = 1; i < 20; i++) {
    if ((i * 5) % 25 == 0) {
      //major ticks at 25,50,75 (% to find integrs divisible by 25)
      $('<span class="ui-slider-tick-mark_large"></span>')
        .css("bottom", i * 5 - 2 + "%")
        .appendTo(".shell.ui-slider")
        .css("height", "16px");
    } else {
      $('<span class="ui-slider-tick-mark"></span>')
        .css("bottom", i * 5 - 1 + "%")
        .appendTo(".shell.ui-slider")
        .css("height", "8px");
    }
  }
}

export function setValues(p) {
  output("");
  Object.keys(p).forEach((v) => {
    $(`#${v}`).val(p[v].toFixed(validValues[v].precision));
  });
  $("#slider-vertical1").slider("value", p.n);
  $("#slider-vertical2").slider("value", p.power);
}

// Function to do common tasks all together in one call.  Whenever a parameter
// is changed, the following all need to happen to keep the data updated
$(function() {
  channel.on("change", setValues);
  channel.on("drag", setValues);
});

export function validate(component, p) {
  const id = Object.keys(component)[0];
  const val = parseFloat(component[id]);
  output("");

  function withinBounds(component) {
    const id = Object.keys(component)[0];
    const val = parseFloat(component[id]);
    const { min, max, msg } = validValues[id];

    if (isNaN(val) || !val || val < min || val > max) {
      setValues(p); // reset UI to its preexisting state
      output(msg); // Inform the console
      return false; // Inform the caller
    }
    return true;
  }

  // If invalid, dont check dependent values, just return false
  if (!withinBounds(component)) return false;

  // If original value was valid, make sure dependent field is valid
  if (id === "power") {
    // Return false if we're trying to set power lower than lowest permitted value predicted by our formulas.  Else calculate whether n is within bounds for that allowable power
    return (
      val > calculateValue("power", p, { n: validValues.n.min }) &&
      withinBounds({
        n: calculateValue("n", p, { power: val }),
      })
    );
  }

  if (["mu0", "mu1", "n", "std", "alpha"].includes(id)) {
    return withinBounds({
      power: calculateValue("power", p, { [id]: val }),
    });
  }

  // If we're changing delta, make sure that resulting mu1 is within bounds, then that resulting
  if (id === "delta") {
    const t_mu1 = calculateValue("mu1", p, { delta: val });
    const t_power = calculateValue("power", p, { mu1: t_mu1 });
    return withinBounds({ mu1: t_mu1 }) && withinBounds({ power: t_power });
  }
}