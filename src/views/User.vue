<template>
  <div class="user">
    <div class="user__container">bngngngfngngn</div>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 120px;
  
  &__container {
    height: 500px;
    width: 500px;
    border: 1px solid black;
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
    background-color: white;
  }
}
</style>