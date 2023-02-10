<template>
  <div class="grid">
    <img class="image stacked-item" :src="source" />
    <div v-if="caption" class="overlay stacked-item">
      <span class="text">Text Here</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["source", "caption"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/gridLayouts.scss";
.image {
  overflow: hidden;
  width: 100%;
  display: block;
}

.stacked-item {
  grid-row-start: 1;
  grid-column-start: 1;
}

.zoomed img {
  transform: scale(1.01);
}

.overlay {
  display: grid;
  align-content: center;
  height: 100%;
  text-align: center;
  transition: opacity 0.25s;
  background-color: rgba(230, 230, 230, 0.5);
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  .text {
    font-style: oblique;
    text-shadow: 0px 0px 10px rgba(20, 20, 20, 0.8);
    color: white;
  }
}
</style>
