<template>
  <div class="button">
    <button class="button__content" type="button" v-on:click="clicked">Crear usuario</button>
  </div>
</template>

<script>
export default {
  name: "Button",
  methods: {
      clicked() {
          console.log("siu")
          this.$emit("clicked");
      }
  }
};
</script>

<style lang="scss" scoped>
.button {
  &__content {
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    color: $white;
    background-color: $blue-primary;

    &:hover {
      box-shadow: 0px 0px 22px -5px $blue-primary;
  }
  }

  
}
</style>