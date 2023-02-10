<template>
  <div id="chart"></div>
</template>

<script>
import { kickoff } from "@/assets/javascript/moment/moment.js";
import * as moment from "@/assets/javascript/moment/moment.json";
// import * as moment_before from "@/assets/javascript/moment/moment_before.json";
import c3 from "c3";

export default {
  name: "HelloWorld",
  props: ["title", "desc", "icon"],
  mounted() {
    kickoff(moment.default, c3);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/c3.scss";

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
