<template>
  <div class="masonry">
    <section class="surf-image panel" v-for="(source, i) in images" :key="i">
      <image-with-hover :source="source" />
    </section>
  </div>
</template>
<script>
import ImageWithHover from "@/components/ImageWithHover";

export default {
  components: { ImageWithHover },
  data() {
    return {
      images: Array.from(Array(18)).map((_, i) =>
        require(`../assets/images/people/People-${i + 1}.jpg`)
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  width: unset;
  margin: unset;
  overflow: hidden;
}
.panel {
  padding: unset;
}

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
  margin-bottom: 1rem;
}
</style>
