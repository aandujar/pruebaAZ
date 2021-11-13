<template>
  <div class="button-carrousel" v-on:click="clicked">
    <Icon :focused="true" :type="icon" />
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  name: "ButtonCarrousel",
  components: { Icon },
  props: { icon: { type: String, required: true } },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="scss" scoped>
.button-carrousel {
  height: 80px;
  width: 80px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    box-shadow: 0px 0px 11px 0px $blue-primary;
    cursor: pointer;
  }
}
</style>