<template>
  <div class="wrapper">
    <UserInformation class="wrapper__user-information" />
    <router-view class="wrapper__content" />
  </div>
</template>

<script>
import UserInformation from "@/components/UserInformation";

export default {
  name: "Wrapper",
  components: {
    UserInformation,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;

  &__user-information {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
  }

  &__content {
    padding-left: 350px;
  }

  @media (max-width: 900px) {
    &__user-information {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      overflow-y: auto;
      z-index: 100;
    }

    &__content {
      height: 100%;
      width: 100vw;
      padding-left: 0;
    }
  }
}
</style>