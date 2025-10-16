<template>
  <header class="app-header">
    <div class="app-header-left">
      <el-icon size="18" class="app-header-logo">
        <i class="el-icon" />
      </el-icon>
      <el-text class="app-header-title" truncated>项目标题</el-text>
    </div>
    <el-space class="app-header-actions" :size="8" wrap>
      <slot name="actions"></slot>
    </el-space>
  </header>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-md;
  z-index: $z-toolbar;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.15));
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
}

.app-header-left {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.app-header-title {
  font-size: 16px;
  font-weight: 600;
}

.app-header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.app-header-logo {
  width: 18px;
  height: 18px;
}
</style>
