<template>
  <div class="total-left-border">
    <div class="g banner-container">
      <div class="image-wrapper">
        <div class="inner-wrapper-for-curves">
          <img
            class="banner"
            :src="require(`../assets/images/home/IMG_4501.jpg`)"
          />
        </div>
      </div>
      <div class="typewriter-wrapper">
        <h1 class="typewriter_h1"></h1>
        <h2 class="typewriter_h2"></h2>
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
      <div class="image-wrapper">
        <div class="inner-wrapper-for-curves has-top">
          <img
            class="bike-image"
            :src="require(`../assets/images/home/IMG_0828.jpg`)"
          />
        </div>
      </div>
      <section class="panel">
        <h1>Outside of work</h1>
        <p>
          In my own projects, I'm always searching for the simplest and most
          direct way to solve a problem and put something new and helpful into
          the world.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import GridItem from "@/components/GridItem";

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
$tablet: 769px;
$mobile: 580px;
$cell: 400px;
$active: whitesmoke;
$newWidth: 50px;

.g {
  display: grid;
  grid-gap: 30px;
}
.grid {
  grid-template-columns: 1fr 1fr;
}

.all-stack-items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

.banner {
  width: 100%;
  border: 3px solid $active;
  border-top: none;
  border-left: none;
  border-radius: 0px;
  border-bottom-right-radius: calc(#{$newWidth}/ 2);
}
.bike-image {
  width: 100%;
  border: 3px solid $active;
  border-left: none;
  border-radius: 0px;
  border-bottom-right-radius: calc(#{$newWidth}/ 2);
  border-top-right-radius: calc(#{$newWidth}/ 2);
}
.total-left-border {
  border-left: 3px solid $active;
}

.typewriter-wrapper {
  width: 100%;
  max-width: 500px;
  align-self: center;
}

.bike-image {
  max-width: 300px;
}

.working-on {
  grid-template-columns: 300px 1fr;
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
  grid-template-columns: minmax(60%, 800px) 1fr;
  max-width: calc(100vw - 20px);
  margin-right: 20px;
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
  left: 0px;
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
  box-shadow: calc(#{$newWidth} / -2) calc(#{$newWidth} / 2) 0 $active;
}

// When bottom chamfer is active (showing), change box shadow so it is revealed
.inner-wrapper-for-curves::after {
  bottom: calc(-1 * #{$newWidth} + 7px);
  box-shadow: calc(#{$newWidth} / -2) calc(-1 * #{$newWidth} / 2) 0 $active;
}

@media screen and (max-width: $tablet - 1) {
  .banner-container,
  .grid {
    grid-template-columns: 1fr;
  }

  .banner {
    width: 95%;
  }
}

.all-stack-items {
  @media screen and (max-width: $tablet - 1) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: $mobile - 1) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: $cell - 1) {
    grid-template-columns: 1fr;
  }
}
</style>
