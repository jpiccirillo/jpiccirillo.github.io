<template>
  <div class="section" style="margin: 0px; padding: 0px">
    <section class="image panel">
      <image-with-hover
        :source="require(`../assets/images/geological/SanYsidroMapjpeg.jpg`)"
      />
    </section>
    <div class="grid grid-image-left">
      <div class="panel section">
        <div class="title-and-pill">
          <h2 class="title">Mapping the San Ysidro Anticline</h2>
          <a
            v-if="false"
            href="https://outcomesresearch.github.io/volt/login/"
            target="_blank"
            class="pill"
            :tag="`a`"
            >Full PDF</a
          >
        </div>
        <p>
          One part of the Earth Science curriculum at Rice University was a
          geological techniques class, offering an introduction to describing,
          recording, and interpreting geologic features in the field, along with
          mapping and creating cross-sections. By far the largest project for
          this course involved mapping a spectacular sequence of rocks along the
          eastern edge of the Colorado Plateau, near San Ysidro, NM. During our
          week of field work, our class divided into small teams and hiked
          through Cretaceous, Jurassic, and Triassic sandstones and siltstones,
          learned how to recognize and record faults and deformed geology, and
          how to perform the variety of observations involved with producing a
          geologic map.
        </p>
        <p>
          After returning to Houston, we spent the spring interpreting our
          observations and data. From these efforts, we produced our own,
          regional geologic map and cross section of the San Ysidro area, in
          addition to field methods report and a general geologic history of the
          Southwest.
        </p>
        <p>
          This page showcases the final compilation I produced, including the
          geologic map, cross section, and unit descriptions. Below is a small
          collection of photos I took over the course of the trip.
        </p>
      </div>
      <div class="panel section">
        <h3>Tools</h3>
        <div class="grid all-stack-items">
          <grid-item
            title="Adobe Photoshop"
            desc="for handling raster-oriented drafting and handling of aerial imagery"
            :icon="require(`../assets/images/home/photoshop.svg`)"
          />
          <grid-item
            title="Adobe Illustrator"
            desc="for handling SVG-oriented design and rendering"
            :icon="require(`../assets/images/geological/illustrator.svg`)"
          />
        </div>
      </div>
    </div>
    <div class="section grid album centered-statement">
      <div class="panel image" v-for="(source, i) in images" :key="i">
        <image-with-hover :source="source" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageWithHover from "@/components/ImageWithHover";
import GridItem from "@/components/GridItem";
const imageNumbers = [8, 27, 79, 88, 105, 107, 118, 121, 127, 132, 134, 138];

export default {
  components: { ImageWithHover, GridItem },
  data() {
    return {
      images: imageNumbers.map((i) =>
        require(`../assets/images/geological/NM-${i}.jpg`)
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/gridLayouts.scss";
@import "@/assets/scss/pill.scss";
@import "@/assets/scss/grid-item-container.scss";
@import "@/assets/scss/sizes.scss";

.album {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 2rem;
}

@media screen and (max-width: $tablet - 1) {
  .album {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (max-width: $mobile - 1) {
  .centered-statement {
    margin: 0.75rem !important;
    max-width: unset;
  }
  .album {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
