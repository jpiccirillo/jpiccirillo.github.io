<template>
  <div class="section" style="margin: 0px; padding: 0px">
    <div class="panel section">
      <div class="title-and-pill">
        <h2 class="title">Visualizing iPhone App Usage</h2>
        <a
          v-show="false"
          href="https://outcomesresearch.github.io/volt/login/"
          target="_blank"
          class="pill"
          :tag="`a`"
          >Live Site</a
        >
      </div>
      <h3>Breakdown of which apps I use most, when</h3>
      <p>
        Most of us would say that the less time spent on a screen, the better.
        While I feel this way for myself and my phone, in the era before iOS had
        the 'Scren Time' tracking functionality, it was tricky to know just
        where all that time went.
      </p>
      <p>
        I wanted to answer this question for myself, and also wanted a way to
        visualize the data. While doing this, I wondered,
        <b>will this knowledge help me use my phone less?</b>
      </p>
    </div>
    <section class="panel section" v-if="livePlot">
      <moment-chart />
      <i
        ><small
          >Drag in the bottom plot to expose different areas of the dataset. Tap
          or hover in the top plot for detail about time on each app.</small
        ></i
      >
    </section>
    <section class="image panel" v-else>
      <image-with-hover
        :source="require(`../assets/images/moment/standard.png`)"
      />
    </section>
    <div class="panel section centered-statement">
      <h3>Challenges</h3>
      <p>
        Besides parsing and massaging the data, then manipulating JSON, the hard
        parts represented the challenges of visualizing data on devices overall:
        How do I guarantee that all users, even those on small screens, have a
        proper-looking plot and an experience that is as simple and
        straightforward as possible.
      </p>
      <ul>
        <li>
          <b>Keeping plot dimensions in sync with browser window:</b> When a
          user resizes their screen or rotates the phone around, the available
          space changes, but this fact often must be communicated to the plot
          with Javascript, rather than (preferable) CSS
        </li>
        <li>
          <b>X-axis ticks: </b>At small screen widths, axis ticks and labels are
          a nightmare to place, and built-in options to 'cull' ticks often fall
          short, leaving the mobile-plot a cluttered mess
        </li>
        <li>
          <b>Touch events: </b>Mobile devices lack a 'hover' functionalit
          (excluding <span class="monospace"> ontouchstart</span> etc.) around
          which most tooltip functionality centers. Instead, mobile users must
          click on the plot to engage a tooltip, which runs the risk of engaging
          other interactions, like drag and 'double-tap-to-enlarge'
        </li>
        <li>
          <b>Loading data: </b>Whether you're prioritizing mobile or desktop
          experiences, pull only the minimum amount of data - typically just
          enough to render the initial view of the plot. Only when the user
          manipulates the plot to show more of the dataseries do you request
          more data. This would be a great opportunity for me to build out an
          API with a few key endpoints to serve these needs and cut down on the
          loadtime + slowdown
        </li>
      </ul>
    </div>
    <div class="grid grid-image-right">
      <div class="panel section">
        <h3>Background</h3>
        <p>
          <a href="https://appadvice.com/app/moment-cut-screen-time/771541926"
            >Moment</a
          >
          works in the background to track key usage metrics: Number of
          "pick-ups", total minutes used, and minutes used on specific apps. As
          long as you keep Moment on in the background, it gathers
          minutes/pickups-per-day info on its own. To track app usage, it
          requires a screenshot to be taken from "Settings" at the end of the
          day, giving a break-down based on the amount of the battery that each
          app used. Moment also supports exporting the collected / parsed data.
        </p>
      </div>
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/moment/less-long.png`)"
        />
      </section>
    </div>
    <section class="image panel">
      <image-with-hover
        :source="require(`../assets/images/moment/moment_gif.gif`)"
      />
    </section>
  </div>
</template>

<script>
import ImageWithHover from "@/components/ImageWithHover";
import MomentChart from "@/components/MomentChart";

export default {
  components: { ImageWithHover, MomentChart },
  data() {
    return { livePlot: false };
  },
  mounted() {
    this.shouldShowPlot();
    window.onresize = this.shouldShowPlot;
  },
  methods: {
    shouldShowPlot() {
      this.livePlot = window.innerWidth > 400;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/traffic-light.scss";
@import "@/assets/scss/gridLayouts.scss";
@import "@/assets/scss/pill.scss";
@import "@/assets/scss/grid-item-container.scss";
</style>
