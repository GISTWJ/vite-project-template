<template>
  <div class="app-layout">
    <Main>
      <slot />
    </Main>
    <Header>
      <template #actions>
        <slot name="header-actions" />
      </template>
    </Header>
    <Footer>
      <template #left>
        <slot name="footer-left" />
      </template>
      <template #right>
        <slot name="footer-right" />
      </template>
    </Footer>
  </div>
</template>

<script setup>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
import Main from './components/Main/index.vue'
</script>

<style lang="scss" scoped>
.app-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
