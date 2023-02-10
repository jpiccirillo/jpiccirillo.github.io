<template>
  <div class="section" style="margin: 0px; padding: 0px">
    <div class="panel section">
      <div class="title-and-pill">
        <h2 class="title">Statistical Power Applet</h2>
      </div>
      <h3>Tool to visualize what variables contribute to statistical power</h3>
      <p>
        I built this project to enable exploration around the factors that
        contribute to statistical power - the probability that a test of
        significance will pick up on an effect that is present. With
        <a href="https://d3js.org/" target="_blank">d3.js</a> (a javascript
        visualization library), HTML, and CSS, this tool shows how the averages
        of two populations, sample size, and standard deviation can establish
        confidence in our ability to answer to a question about two populations.
      </p>
    </div>
    <div class="grid grid-image-left">
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/power_applet/gif_of_use.gif`)"
        />
      </section>
      <div class="panel section">
        <h3>Tech Stack</h3>
        <div class="grid all-stack-items">
          <grid-item
            title="D3.js"
            desc="to place and manipulate blue and red SVG curves in
              the DOM, handle drag events, and other tasks"
            :icon="require(`../assets/images/power_applet/d3.svg`)"
          />
          <grid-item
            title="jStat"
            desc="to perform advanced statistical operations without
              the need of a dedicated statistical language"
            :icon="require(`../assets/images/power_applet/d3.svg`)"
          />
          <grid-item
            title="SVG API"
            desc="to create custom curves, rectangles, lines and
              other on-the-fly geometry that change shape and characteristics
              when parameters shift"
            :icon="require(`../assets/images/power_applet/w3c.svg`)"
          />
          <grid-item
            title="HTML and CSS"
            desc="for setting up a template for the project and
              applying styling"
            :icon="require(`../assets/images/power_applet/html5.svg`)"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-image-right">
      <div class="panel section">
        <h3>Project Purpose and Goal</h3>
        <p>
          Originally, students at a major medical campus used a
          <a herf="https://wise1.cgu.edu/power_applet/power.asp#/"
            >Java Applet</a
          >
          from
          <a href="http://wise.cgu.edu/"
            >web interface for statistics education</a
          >. While the statistics behind the applet were solid, I found them
          undermined by the complicated process of disabling popups, allowing
          addons to run, tweaking system settings, and reading the literal
          Troubleshooting PDF.
          <b>The user experience was unpredictable and unreliable at best</b>,
          and when the applet did run, it felt out of date with pixelated
          graphics and clumsy click events.
        </p>
        <p>
          I was certain I could write something more current, enjoyable, and
          practical using simple JS, SVG, HTML, and CSS.
        </p>
      </div>
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/power_applet/test3.png`)"
        />
      </section>
    </div>
    <div class="panel section centered-statement">
      <h3>Problems and thought process</h3>
      <p>
        Three years after writing the initial version of this applet (and 1.5
        revamps later), I've learned that the challenges in this deceptively
        complex project represent good software overall:
      </p>
      <ul>
        <li>
          All variables are connected - when one is changed, others recalculate.
          Which others are forced to change is different for each variable.
          <b
            >This complex system of push and pull can easily create infinite
            loops and other update / rendering glitches</b
          >
        </li>
        <li>
          Setting up "layers": a Presentation Layer for user interaction,
          feeding those inputs into a generalized calculation engine (formulas
          in a Statistics Layer), returning results to the Presentation Layer to
          replot the curves, sliders, and input boxes
        </li>
        <li>
          Multiple sources of input: For example, we can both drag a curve AND
          change the "mu0" input field, to change the same underlying value
          (mean of the Alternative Population)
        </li>
        <li>
          Boundary conditions: Need to not only prevent user from inputting bad
          values directly, but also ensure that variables calculated as a result
          stay within bounds too. I.E - since power's calculated from sample
          size, even if sample size is within bounds, it could still create a
          value for power that is out of bounds
        </li>
        <li>
          Values at the right must be displayed in a certain rounded format, but
          internally in the system, they must be as precise as possible
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ImageWithHover from "@/components/ImageWithHover";
import GridItem from "@/components/GridItem";

export default {
  components: { ImageWithHover, GridItem },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pill.scss";
@import "@/assets/scss/gridLayouts.scss";
</style>
