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
                      v-model="mu0"
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
                      v-model="mu1"
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
                      v-model="std"
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
                      v-model="delta"
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
                      v-model="alpha"
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
                      v-model="n"
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
                      v-model="power"
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
import { validValues } from "@/assets/javascript/power-applet/validValues.js";
import {
  validate,
  setSliderTicks,
} from "@/assets/javascript/power-applet/validation.js";
import {
  sample,
  prepare,
  setValuesNew,
  initScreenSize,
  axisPrep,
  setClipPaths,
} from "@/assets/javascript/power-applet/curves.js";
import { calculateValue } from "@/assets/javascript/power-applet/calculations.js";
import { bus } from "@/assets/javascript/power-applet/Shapes.js";

export default {
  data() {
    return {
      mu0: validValues.mu0.initial,
      mu1: validValues.mu1.initial,
      std: 5,
      delta: 1,
      alpha: 0.05,
      n: 4,
      power: 0.8,
    };
  },
  watch: {
    mu0() {
      this.power = calculateValue("power", this._data);
      this.effectsize = calculateValue("effectsize", this._data);
      this.delta = calculateValue("delta", this._data);
      axisPrep(this._data);
    },
    mu1() {
      this.power = calculateValue("power", this._data);
      this.effectsize = calculateValue("effectsize", this._data);
      this.delta = calculateValue("delta", this._data);
      axisPrep(this._data);
    },
    std() {
      this.power = calculateValue("power", this._data);
      this.effectsize = calculateValue("effectsize", this._data);
      this.delta = calculateValue("delta", this._data);
      axisPrep(this._data);
    },
    alpha() {
      this.power = calculateValue("power", this._data);
      this.effectsize = calculateValue("effectsize", this._data);
      setClipPaths(this._data);
    },
    n() {
      this.power = calculateValue("power", this._data);
      this.effectsize = calculateValue("effectsize", this._data);
      setClipPaths(this._data);
    },
    // power() {
    //   console.log(JSON.stringify(this._data));
    //   this.n = calculateValue("n", this._data);
    //   this.effectsize = calculateValue("effectsize", this._data);
    // },
    // delta() {
    //   this.mu1 = calculateValue("mu1", this._data);
    //   this.power = calculateValue("power", this._data);
    // },
  },
  mounted() {
    bus.$on("drag", this.setMu1);
    //Register listener for screen resize
    $(window).resize(initScreenSize);

    // Remove spinner on:mount
    $("#loader").remove();
    $(".container").css("display", "block");
    $("#description").css("display", "block");
    initScreenSize();

    this.power = calculateValue("power", this._data);
    // this.delta = calculateValue("delta", this._data);

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
    prepare(this._data);
  },
  methods: {
    validate,
    sample,
    setMu1(event) {
      this.mu1 = event.changed.mu1;
      return true;
    },
    screen_w() {
      return $(".maingraph").innerWidth();
    },
    screen_h() {
      return $(".maingraph").innerHeight();
    },
    topscreen_h() {
      return $(".minigraph").innerHeight();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/power_applet.scss";
@import "@/assets/scss/jquery-ui.scss";
</style>
