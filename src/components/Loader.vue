<template>
  <div class="loader">
    <pulse-loader :loading="true" color="#3f51b5"></pulse-loader>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Loader",
  components: { PulseLoader },
};
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  z-index: 200;
  position: fixed;
}
</style>