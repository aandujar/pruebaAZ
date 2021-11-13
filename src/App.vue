<template>
  <div id="app">
    <router-view />
    <notifications group="foo" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
  background-color: $grey-background;
  overflow-y: auto;
}
</style>
