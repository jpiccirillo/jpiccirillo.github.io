<template>
  <div>
    <div id="loader"></div>
    <div class="container">
      <div class="controls">
        <div style="height: 70%;">
          <div class="leftControls">
            <div class="inputContainer">
              <table>
                <tr>
                  <td>
                    μ<sub>0</sub> =
                    <input
                      type="text"
                      id="mu0"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    μ<sub>1</sub> =
                    <input
                      type="text"
                      id="mu1"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    σ =
                    <input
                      type="text"
                      id="std"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    d =
                    <input
                      type="text"
                      id="delta"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    α =
                    <input
                      id="alpha"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td>β = <input type="text" id="effectsize" disabled /></td>
                </tr>
                <tr>
                  <td>
                    n =
                    <input
                      type="text"
                      id="n"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Power =
                    <input
                      type="text"
                      id="power"
                      autocomplete="off"
                      @change="
                        validate({ [this.id]: this.value }) &&
                          setValuesNew({ [this.id]: this.value })
                      "
                    />
                  </td>
                </tr>
              </table>

              <div class="samplebutton" @click="sample()">Sample</div>
            </div>
          </div>
          <div class="rightControls">
            <div id="slider-vertical2" class="shell">
              <div class="inner label">P<br />o<br />w<br />e<br />r</div>
            </div>
            <div id="slider-vertical1" class="shell">
              <div class="inner label">n</div>
            </div>
          </div>
        </div>
        <div class="consoleContainer">
          <div class="console">console down here</div>
        </div>
      </div>
      <div class="graph">
        <div class="minigraph"></div>
        <div class="maingraph"></div>
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "jquery-ui";
// import Chanel from "@/assets/javascript/Channel.js";
// import Shapes from "@/assets/javascript/Channel.js";
import { validValues } from "@/assets/javascript/power-applet/validValues.js";
// import calculations from "@/assets/javascript/calculations.js";
import {
  validate,
  setSliderTicks,
} from "@/assets/javascript/power-applet/validation.js";
import {
  sample,
  prepare,
  setValuesNew,
  initScreenSize,
} from "@/assets/javascript/power-applet/curves.js";

export default {
  mounted() {
    //Register listener for screen resize
    $(window).resize(initScreenSize);

    // Remove spinner on:mount
    $("#loader").remove();
    $(".container").css("display", "block");
    $("#description").css("display", "block");
    initScreenSize();

    // Set up sliders before calling prepare
    const sharedParameters = (f) => ({
      orientation: "vertical",
      range: "min",
      min: validValues[f].min,
      max: validValues[f].max,
      slide: function(event, ui) {
        const changed = { power: ui.value };
        return validate(changed) && setValuesNew(changed, "change");
      },
    });
    $("#slider-vertical2").slider({
      ...sharedParameters("power"),
      value: 0.6, // similar value until calculated in const p object
      step: 0.001,
    });
    $("#slider-vertical1").slider({
      ...sharedParameters("n"),
      step: 1,
      create: (e) => setSliderTicks(e.target),
    });
    prepare();
  },
  methods: {
    validate,
    sample,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/power_applet.scss";
@import "@/assets/scss/jquery-ui.scss";
</style>
