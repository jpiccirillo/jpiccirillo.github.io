<template>
  <div class="total-left-border">
    <div class="g banner-container">
      <div class="typewriter-wrapper">
        <h1 class="typewriter_h1"></h1>
        <h2 class="typewriter_h2"></h2>
      </div>
      <div class="image-wrapper">
        <div class="inner-wrapper-for-curves">
          <img
            class="banner panel"
            :src="require(`../assets/images/home/IMG_4501.jpg`)"
          />
        </div>
      </div>
    </div>
    <section class="g grid panel" style="border-top-left-radius">
      <p>
        I'm a 27 year-old software engineer in Austin, TX, currently at
        <a href="holos.io">Holos</a>, designing and implementing a full stack
        web solution to create, manage, share, and interact with VR assets.
      </p>
      <p>
        Before Holos, I built and maintained geospatial web apps for the
        <a href="https://www.sco.wisc.edu/sco/"
          >Wisconsin State Cartographer's</a
        >
        office while completing the
        <a
          href="https://www.cs.wisc.edu/academics/graduate-programs/pcp"
          target="_blank"
          >Professional Capstone Certificate Program in Computer Sciences</a
        >
        at University of Wisconsin, Madison.
      </p>
      <p>
        I love to stay learning, and the times I've most enjoyed from my journey
        are those when others showed me new paradigms and architectures that
        upgraded my idea of robust and maintainable software solutions.
      </p>
      <p>
        In my own projects, I'm always searching for the simplest and most
        direct way to solve a problem and put something new and helpful into the
        world.
      </p>
    </section>
    <section class="panel">
      <h1>My Skills</h1>
      <div class="all-stack-items">
        <grid-item
          title="Vue.js"
          desc="for consistent personal and professional work since 2019"
          :icon="require(`../assets/images/home/vue.svg`)"
        />
        <grid-item
          title="Node.js"
          desc="to architect and implement permission-managed REST API for work since 2018"
          :icon="require(`../assets/images/home/node.svg`)"
        />
        <grid-item
          title="d3.js"
          desc="for all web-based data visualization needs since 2015"
          :icon="require(`../assets/images/power_applet/d3.svg`)"
        />
        <grid-item
          title="Figma"
          desc="for mocking up component based user interfaces for
            work since 2020"
          :icon="require(`../assets/images/home/figma.svg`)"
        />
        <grid-item
          title="Python"
          desc="for editing work, graphic design, and mockups since 2013"
          :icon="require(`../assets/images/home/python.svg`)"
        />
        <grid-item
          title="React.js"
          desc="For occasional personal projects since 2018"
          :icon="require(`../assets/images/home/react.svg`)"
        />
        <grid-item
          title="Git"
          desc="to version-manage and review others' code for all development since 2015"
          :icon="require(`../assets/images/home/git.svg`)"
        />
        <grid-item
          title="HTML / CSS"
          desc="part of daily life, and to reason about JSX, VMMV, MVC and other frontend frameworks"
          :icon="require(`../assets/images/power_applet/html5.svg`)"
        />
        <grid-item
          title="Photoshop"
          desc="for editing work, graphic design, and mockups since 2013"
          :icon="require(`../assets/images/home/photoshop.svg`)"
        />
      </div>
    </section>
    <div class="g working-on">
      <section class="panel">
        <h1 style="margin-bottom: 0px;">Current and future projects</h1>
        <h4 style="color: var(--grey5); font-style: oblique; margin-top: 0px">
          Completed projects availabe from sidebar
        </h4>
        <p>
          I always have new ideas floating around in my head for next projects -
          I'm most interested in visualizing data I've collected about my own
          habits, life, and fitness, (through smartwatch, smartphone shortcuts
          and widgets I've written to time-track). Our world is full of rich
          data and building applications to visualize, manipulate, and
          understand trends is fascinates me.
        </p>
        <p>
          The more experience and applicaitons I build, the more I think in
          terms of the entire stack, and exciting features and possiblities that
          lie in each part of the stack (backend, frontend, API in between, etc)
        </p>
        <div class="project-items">
          <div class="project">
            <span>
              Dashboard for visualizing workout progress as collected from
              <a href="https://www.strong.app" target="_blank">Strong App</a>.
              Frontend in Vue shows various exercise types and timeseries data
              showing stength training progress
            </span>
          </div>
          <div class="project">
            <span>
              Web map exposing detailed biking and walking data from
              <a href="https://www.strava.com" target="_blank">Strava</a>
              API and Healthkit. Current solutions don't permit analyzing
              intra-route speed based on location, terrain, and other factors.
              Geospatially showcasing all routes in the dataset at once permits
              analyzing global trends for where I bike and walk over time
            </span>
          </div>
          <div class="project">
            <span>
              Python project to process and parse 4 years' computer usage data
              from
              <a href="www.rescuetime.com" target="_blank">RescueTime</a>, and
              API to expose it at meaningful endpoints. Already wrote python3
              script which runs locally to collect and colate this data,
              eliminating need for Premium subscription, which is the only way
              to see data older than 3mo</span
            >
          </div>
        </div>
      </section>
      <div class="forest-grid">
        <div>
          <img
            class="forest-image panel"
            :src="require(`../assets/images/home/IMG_8149.jpg`)"
          />
        </div>
        <div class="image-wrapper">
          <div class="inner-wrapper-for-curves has-top">
            <img
              class="bike-image panel"
              :src="require(`../assets/images/home/IMG_0828.jpg`)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import GridItem from "@/components/GridItem";
// import ImageGrid from "@/components/ImageGrid";

function cb() {
  return new Promise((r) => {
    $(this)
      .css({ display: "inline", opacity: 0 })
      .animate({ opacity: 1 }, 10)
      .promise()
      .done(r);
  });
}

export default {
  name: "Home",
  components: { GridItem },
  async mounted() {
    var h1 = "Hi, I'm Jeffrey";
    var h2 = "Software engineer in Austin, Texas.";
    await this.write(h1, ".typewriter_h1");
    await this.write(h2, ".typewriter_h2");
  },
  methods: {
    async write(str, selector) {
      const c = "<span>" + str.split("").join("</span><span>") + "</span>";
      const spans = $(c)
        .hide()
        .appendTo(selector);

      for (let i = 0; i < spans.length; i++) {
        await cb.call(spans[i]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$desktop: 969px;
$tablet: 770px;
$mobile: 580px;
$cell: 400px;
$active: whitesmoke;
$newWidth: 50px;

.banner,
.bike-image,
.forest-image {
  padding: 0px;
  width: 100%;
  border: 3px solid $active;
  border-radius: 0px;
}

.banner {
  border-top: none;
  margin-left: 30px;
}

.banner,
.bike-image {
  border-bottom-left-radius: calc(#{$newWidth}/ 2);
}

.bike-image {
  border-top-left-radius: calc(#{$newWidth}/ 2);
}

.forest-image {
  border-radius: 10px;
}

.image-wrapper {
  padding: 30px;
  padding-right: 0px;
  overflow: hidden;
}

.banner-container > .image-wrapper {
  padding-top: 0px;
}

.project-items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.forest-grid {
  display: grid;
  grid-template-columns: auto 300px;
  grid-gap: 30px;
  align-items: center;
}

.project {
  font-family: monospace;
  background-color: var(--grey7);
  border-radius: 5px;
  overflow: hidden;
  padding: 1.25rem;
  height: min-content;
  border: 2px solid var(--grey6);
}
.g {
  display: grid;
  grid-gap: 30px;
}
.grid {
  grid-template-columns: 1fr 1fr;
}

.all-stack-items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

.total-left-border {
  border-right: 3px solid $active;
  margin-right: 0.75rem;
}

.typewriter-wrapper {
  width: 100%;
  margin: auto auto auto 30px;
  align-self: center;
}

.bike-image {
  max-width: 300px;
}

.working-on {
  grid-template-columns: auto 300px;
  margin-left: 1.25rem;
  align-items: center;
}

h1,
h2,
p {
  margin-top: 0px;
}

[class*="typewriter"] {
  font-family: monospace;
}

.banner-container {
  grid-template-columns: auto minmax(60%, 800px);
  max-width: 100%;
  grid-row-gap: 0px;
  // margin-right: 20px;
  // grid-gap: 0px;
}

.inner-wrapper-for-curves {
  position: relative;
}
.inner-wrapper-for-curves.has-top:before {
  top: calc(-1 * #{$newWidth});
}

.inner-wrapper-for-curves:after {
  bottom: calc(-1 * #{$newWidth});
}

// Curved elements' default state
.inner-wrapper-for-curves.has-top:before,
.inner-wrapper-for-curves:after {
  content: "";
  position: absolute;
  right: 0px;
  width: #{$newWidth};
  height: #{$newWidth};
  background: transparent;
  border-radius: 100%;
  pointer-events: none;
  z-index: 0;
}

// When top chamfer is active (showing), change box shadow so it is revealed
.inner-wrapper-for-curves.has-top::before {
  top: calc(-1 * #{$newWidth});
  box-shadow: calc(#{$newWidth} / 2) calc(#{$newWidth} / 2) 0 $active;
}

// When bottom chamfer is active (showing), change box shadow so it is revealed
.inner-wrapper-for-curves::after {
  bottom: calc(-1 * #{$newWidth} + 7px);
  box-shadow: calc(#{$newWidth} / 2) calc(-1 * #{$newWidth} / 2) 0 $active;
}

@media screen and (max-width: $desktop - 1) {
  .working-on {
    grid-template-columns: 1fr;
  }
  .all-stack-items {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .project-items {
    grid-template-columns: 1fr;
  }
}
@media screen and (min-width: $desktop - 1) {
  .forest-image {
    display: none;
  }
  .forest-grid {
    grid-gap: 0px;
  }
}
@media screen and (max-width: $tablet - 1) {
  .all-stack-items {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (max-width: $mobile - 1) {
  .all-stack-items {
    grid-template-columns: 1fr 1fr;
  }
  .forest-image {
    display: none;
  }
  .forest-grid {
    grid-gap: 0px;
  }
  .banner-container,
  .grid {
    grid-template-columns: 1fr;
  }
  .typewriter-wrapper {
    order: 2;
    margin-top: 0px;
  }
}
@media screen and (max-width: $cell - 1) {
  .all-stack-items {
    grid-template-columns: 1fr;
  }
  .total-left-border {
    overflow-x: hidden;
  }
}
</style>
