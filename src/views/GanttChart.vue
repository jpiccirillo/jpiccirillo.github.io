<template>
  <div class="section" style="margin: 0px; padding: 0px">
    <div class="panel section">
      <div class="title-and-pill">
        <h2 class="title">Visualizing Plant Lifespans</h2>
        <a
          href="https://jpiccirillo.com/gantt-plant-timeline"
          target="_blank"
          class="pill"
          :tag="`a`"
          >Live Site</a
        >
      </div>
      <h3>
        Interactive Gantt Chart to visualize and compare lifespan of plants
        grown from seed
      </h3>
      <p>
        I love taking fruits bought at the store and germinating their seeds,
        tending to them and watching them grow into big strong plants. Since I
        already record dates and observations about which ones do well and which
        ones are fragile and finnicky, I have a rich timeseries dataset from
        which to visualize their lifespans.
      </p>
      <p>
        This project is an interactive timeline chart showing the lifespans of
        those plants, the strong ones and the weak ones, the ones successfully
        producing peppers and fruit and the ones who rotted or died in the first
        week. Sections of horizontal bars represent long stages of a plant's
        life, while dots represent day-level events and observations.
      </p>
    </div>
    <div class="grid grid-image-left">
      <section class="image panel">
        <image-with-hover
          :source="require(`../assets/images/gantt/ganttTimeline3.jpg`)"
        />
      </section>
      <div class="panel section">
        <h3>Tech Stack</h3>
        <div class="grid all-stack-items">
          <grid-item
            title="React.js"
            desc="to implement the site, UI components, data flow and state management"
            :icon="require(`../assets/images/home/react.svg`)"
          />
          <grid-item
            title="Github Actions"
            desc="to deploy the site, and engage various npm scripts during the build process"
            :icon="require(`../assets/images/home/github.svg`)"
          />
          <grid-item
            title="D3.js"
            desc="to render horizontal bars, dynamically calculate axis and implement the visualization"
            :icon="require(`../assets/images/power_applet/d3.svg`)"
          />
          <grid-item
            title="Node.js"
            desc="to support buildtime scripts which transform source data into optimal shapes, reducing runtime burden on client"
            :icon="require(`../assets/images/home/node.svg`)"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-image-right">
      <div class="panel section">
        <h3>Project Purpose and Goal</h3>
        <p>
          Gantt charts are often seen in project management tools to visualize
          progress on long-scale projects. They enforce the idea of a span of
          time - exactly how I see my plants growing and thriving over their
          lives.
        </p>
        <p>
          This project was great practice at showcasing relatively-complex,
          real-life data in an interactive, mobile-first format.
        </p>
        <p>
          In prioritizing creating a meaningful mobile experience I considered
          obstacles like nonparity between touch, click and resize events
          between desktop and mobile, small-width-availability for the chart,
          and avoiding heavy-data manipulation on the client for speedy data
          rerender and responsiveness.
        </p>
      </div>
      <section class="">
        <div class="grid side-by-side">
          <div class="image panel">
            <image-with-hover
              :source="require(`../assets/images/gantt/ganttTimelineiOS.jpg`)"
            />
          </div>
          <div class="image panel">
            <image-with-hover
              :source="
                require(`../assets/images/gantt/ganttTimelineAndroid.jpg`)
              "
            />
          </div>
        </div>
      </section>
    </div>
    <div class="panel section centered-statement">
      <h3>Problems and thought process</h3>
      <p>
        As always with data visualization, creating a clean and productive
        mobile experience is difficult due to the small canvas size of a phone.
        Nevertheless, this is how a large portion of visitors land on the site.
      </p>
      <ul>
        <li>
          Replotting the visualization after browser resize events proved
          tricky. While expected to have the SVG container simply fill the
          parent grid item with width=100%, the internals of the visualization
          required a pixel width for determining all the internal scaling,
          conflicting with the 'simply fill the parent container' approach. This
          complicated resize event and re-render handling.
        </li>
        <li>
          The original filtering logic for showing only a certain species or a
          certain individual plant contained alot of O(N) work: scan all data to
          match a given regex for species, or for a given plant name. This was
          on top of the conversion step from csv, slice and 'expand' that data
          into individual horizontal bar chunks, then format it for the
          visualization. This cluttered and confused my React code and the
          natural flow of data between parent and child components.
          <b>
            To solve this, I added scripts to 'left-shift' this preprocessing
            and data-massaging into build time, creating specific
            result-hashmaps for what the user might look up during runtime,
            replacing most of the O(N) complexities with constant-time
            lookups.</b
          >
          <ul>
            <li>
              This simplified my React components as the data was ready and
              immediatley consumable by the view layer
            </li>
            <li>
              It also meant less lag on the client, as the data crunching
              already occurred when the site was last built and deployed
            </li>
          </ul>
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

.side-by-side {
  grid-template-columns: 1fr 1fr;
  grid-gap: 10%;
  margin: 0px 10%;
  align-items: center;
  * {
    border-radius: 5px;
    overflow: hidden;
  }
}

@media screen and (max-width: ($desktop - 1)) {
  .side-by-side {
    margin: 10px;
  }
}
</style>
