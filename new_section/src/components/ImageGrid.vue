<template>
  <div class="overall-grid panel">
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
    <div class="cell-wrapper">
      <img :src="require(`../assets/images/home/IMG_0828.jpg`)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.overall-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;
  border: 3px solid whitesmoke;
  background-color: whitesmoke;
  grid-gap: 3px;
  box-sizing: border-box;
  padding: 0px !important;
}
.cell-wrapper {
  // max-width: 30%;
  height: min-content;
  background-image: url("../assets/images/home/IMG_0828.jpg");
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;

  & img {
    width: 100%;
    height: 0;
    // display: block;
  }
}
</style>
