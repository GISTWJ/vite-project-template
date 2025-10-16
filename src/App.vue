<template>
  <Layout>
    <!-- 主体区域插槽：此处可放 CesiumViewer 或路由出口 -->
    <!-- 头部右侧动作按钮插槽（可选） -->
    <template #header-actions>
      <el-button type="primary" class="glass-button">操作</el-button>
    </template>

    <!-- 底部左右插槽（可选） -->
    <template #footer-left>授权信息或版权声明</template>
    <template #footer-right>
      <el-button class="glass-button">帮助</el-button>
    </template>
  </Layout>
</template>

<script setup>
import Layout from '@/layout/index.vue'
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
