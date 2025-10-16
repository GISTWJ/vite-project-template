<template>
  <footer class="app-footer">
    <el-space class="app-footer-left" :size="8" wrap>
      <slot name="left">© 2025 Company. All rights reserved.</slot>
    </el-space>
    <el-space class="app-footer-right" :size="8" wrap>
      <slot name="right"></slot>
    </el-space>
  </footer>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xs $spacing-md;
  z-index: $z-toolbar;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.15));
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
}

.app-footer-left,
.app-footer-right {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}
</style>
