<template>
  <power-applet id="entry"></power-applet>
</template>

<script>
import PowerApplet from "@/components/PowerApplet";

export default {
  components: { PowerApplet },
  created() {
    console.log("hiere");
  },
};
</script>

<style lang="scss" scoped></style>
