<template>
  <div class="grid tech-stack">
    <span v-if="title === `jStat`">
      <pre><b>jStat</b></pre>
    </span>
    <img v-else class="stack-icon" width="40" height="40" :src="icon" />
    <small class="small">
      <b>{{ title }}</b> {{ desc }}
    </small>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["title", "desc", "icon"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stack-icon {
  margin: auto;
}

.tech-stack {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 10px;
  align-items: center;
}
</style>
