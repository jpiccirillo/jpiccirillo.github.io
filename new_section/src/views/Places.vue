<template>
  <div>
    <section>
      <div class="panel">
        <p>
          Landscape photography is my way of capturing and solidifying a memory
          when exploring. During college, field expedtions enabled me to travel
          in Turkey, Iceland and America, and since field sites are based on
          important geology rather than tourism, it gave me a serene and
          original view of locations I would have missed otherwise.
        </p>
        <p>
          While photos here are mostly from field expedition, others are from
          travels to the Middle East during and after college.
        </p>
      </div>
    </section>
    <div class="masonry">
      <section
        class="surf-image panel image"
        v-for="(source, i) in images"
        :key="i"
      >
        <image-with-hover :source="source" />
      </section>
    </div>
  </div>
</template>

<script>
import ImageWithHover from "@/components/ImageWithHover";
const links = [
  "Places-01",
  "Dubai-06",
  "moab-06",
  "Places-02",
  "Places-03",
  "Places-04",
  "jeffrey-078",
  "Places-07",
  "Places-05.5",
  "waterfall-1",
  "Places-06",
  "Places-08",
  "moab-12",
  "Places-11",
  "Places-09",
  "Places-10",
  "Places-12",
  "Places-13",
  "Places-14",
  "Places-15",
  "Places-16",
  "Places-17",
  "Places-18",
  "Places-19",
  "Places-20",
];

export default {
  components: { ImageWithHover },
  data() {
    return {
      images: links.map((name) =>
        require(`../assets/images/places/${name}.jpg`)
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
.masonry {
  /* Masonry container */
  column-count: 4;
  column-gap: 1em;
  margin: 1.25rem 1.5rem;
}

.surf-image {
  /* Masonry bricks or child elements */
  background-color: #eee;
  display: inline-block;
  width: 100%;
  margin: unset;
  margin-bottom: 1rem;
}
</style>
