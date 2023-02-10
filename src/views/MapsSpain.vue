<template>
  <div style="margin: 0px; padding: 0px">
    <div class="grid half-half">
      <div class="panel section">
        <div class="title-and-pill">
          <h2 class="title">Maps of Medieval Spain</h2>
        </div>
        <p>
          While at the GIS / Data Center at Rice, I had the chance to
          collaborate with
          <a :href="irish" target="_blank">Dr. Soifer Irish</a>
          to create maps of pilgrimage routes and holy sites in medieval Spain
          for her book,
          <a :href="book" target="_blank"
            >Jews and Christians in Medieval Castile: Tradition, Coexistence,
            and Change (2016)</a
          >. Dr. Irish is a professor of medieval Iberian history whose work
          explores the changes in Jewish-Christian relations in the Iberian
          kingdom of Castile during the 11th to mid-14th century, a period when
          Christian kingdoms were reclaiming the peninsula from the Umayyad
          Caliphate during the Reconquista.
        </p>

        <p>
          Pilgrimage routes and city locations were georeferenced from hard-copy
          maps, and established through discussion with Dr. Irish.
        </p>
        <p>
          The
          <a :href="gdc" target="_blank">GIS / Data Center</a>
          employs students to assist patrons with their spatial projects using
          ArcMap and Python (for example, architectural or environmental
          students with spatial analysis questions, or need for datasets for
          site research). Additionally, faculty members' research or publication
          projects may require the lab's expertise, giving student employees the
          chance to collaborate on a longer-term basis.
        </p>
      </div>
      <section class="section image panel zoomed clamped">
        <image-with-hover
          :source="require(`../assets/images/mapsspain/map2_small.jpg`)"
        />
      </section>
    </div>
    <div class="grid half-half">
      <div class="grid squares">
        <section class="image panel zoomed clamped">
          <image-with-hover
            :source="require(`../assets/images/mapsspain/map3_small.jpg`)"
          />
        </section>
        <section class="image panel zoomed clamped">
          <image-with-hover
            :source="require(`../assets/images/mapsspain/map1_small.jpg`)"
          />
        </section>
      </div>
      <div>
        <section class="panel section">
          <h3>Tools</h3>
          <div class="grid all-stack-items">
            <grid-item
              title="ArcGIS Esri"
              desc="to handle geospatial data, assemble maps, place cities and labels, and finalize"
              :icon="require(`../assets/images/mapsspain/esri.svg`)"
            />
            <grid-item
              title="Adobe Illustrator"
              desc="to finalize, put on finishing touches, and format for delivery"
              :icon="require(`../assets/images/geological/illustrator.svg`)"
            />
          </div>
        </section>
        <section class="panel section">
          <h3>Challenges</h3>
          <ul>
            <li>
              For this project, I could not make use of modern day digital
              resources for laying the basis of the maps, like country-level
              shapefiles and city lat/lons.
            </li>
            <li>
              The maps pertained to a much older version of Spain than exists
              today - the borders of cities now are often different than they
              were in the Middle Ages (or not there at all).
            </li>
            <li>
              Thus, publicly available shapefiles for towns, cities, borders,
              and even some rivers and shorelines either weren't an option, or
              needed consideration and discussion before use in the project.
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ImageWithHover from "@/components/ImageWithHover";
import GridItem from "@/components/GridItem";

export default {
  components: { ImageWithHover, GridItem },
  data() {
    return {
      irish: "https://history.rice.edu/faculty/maya-soifer-irish",
      book:
        "https://www.amazon.com/Jews-Christians-Medieval-Castile-Coexistence/dp/0813228654",
      gdc: "https://library.rice.edu/gdc",
    };
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
@import "@/assets/scss/sizes.scss";
@import "@/assets/scss/grid-item-container.scss";

.all-stack-items {
  grid-gap: 20px;
}

.half-half {
  justify-items: center;
}

@media screen and (max-width: $desktop - 1) {
  .tall {
    order: 2;
  }
}

@media screen and (max-width: $desktop - 1) {
  .maps-container {
    justify-content: center;
    max-width: 40%;
    // grid-template-columns: 1fr 1fr;
  }
  .half-half {
    grid-template-columns: 1fr;
  }
  .squares {
    order: 2;
  }
  .clamped {
    max-width: 500px;
  }
  .grid-image-left {
    grid-template-columns: 2fr 1fr;
  }
}

@media screen and (max-width: $mobile - 1) {
  .maps-container {
    grid-template-columns: 1fr;
  }
  .half-half {
    grid-template-columns: 1fr;
  }
}
</style>
