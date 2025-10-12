import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Cesium 配置
  define: {
    // 设置 Cesium 基础 URL
    CESIUM_BASE_URL: JSON.stringify('https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/'),
  },
  build: {
    // 确保 Cesium 资源正确复制
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ['cesium'],
        },
      },
    },
  },
  server: {
    fs: {
      // 允许访问 Cesium 的静态资源
      allow: ['..'],
    },
  },
  optimizeDeps: {
    include: ['cesium'],
  },
})
