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
    height: 100%;
    width: 300px;
  }

  &__content {
    padding-left: 350px;
  }
}
</style>