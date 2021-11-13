<template>
  <div
    class="user-info-icon"
    :class="{ 'user-info-icon--pointer': pointer }"
    v-on:click="clicked"
  >
    <Icon focused :type="icon" />
    <div class="user-info-icon__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "UserInfoIcon",
  components: { Icon },
  props: {
    text: { type: String, required: true },
    icon: { type: String, required: true },
    pointer: { type: Boolean, required: false, default: false },
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  &--pointer {
    cursor: pointer;
  }

  &__text {
    padding-left: 10px;
    word-break: break-all;
  }
}
</style>