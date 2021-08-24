<template>
  <img class="image" :src="source" />
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["source"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image {
  overflow: hidden;
  width: 100%;
  display: block;
}
</style>
