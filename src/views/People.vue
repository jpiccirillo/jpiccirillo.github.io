<template>
  <div>
    <section>
      <div class="panel">
        <p>
          During college, I took up portrait photography part-time as a way to
          make use of a passion and my DSLR in a way I never had before - by
          recording fleeting moments for people to remember and cherish. While
          simple on the surface, this can be highly tricky, as often the simple
          presence of a camera can scare away that candidness, authenticity, and
          ease of expression.
        </p>
        <p>
          I learned that good portrait photography depends less on having the
          best camera, lenses, or technical prowess. Being an effective portrait
          photographer is about fostering a comfortable, relaxing environment -
          photos taken in this way are those that people most love and cherish.
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

export default {
  components: { ImageWithHover },
  data() {
    return {
      images: Array.from(Array(18)).map((_, i) =>
        require(`../assets/images/people/People-${i + 1}_small.jpg`)
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
.panel.image {
  height: auto;
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
  margin: 0px;
  margin-bottom: 1rem;
}
</style>
