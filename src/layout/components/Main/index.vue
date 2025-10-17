<template>
  <main class="app-main">
    <slot />
  </main>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  position: absolute;
  inset: 0; // top:0;right:0;bottom:0;left:0;
  // 让地图或三维画布铺满
  width: 100%;
  height: 100%;
  overflow: hidden; // 避免滚动条影响悬浮头尾
}
</style>
