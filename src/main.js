import { createApp } from 'vue'
// pinia store
import pinia from '@/stores'

import App from './App.vue'

// 导入 Cesium 配置
import './config/cesium-config'
// 全局样式（含 Cesium 控件覆盖）
import '@/styles/index.scss'

const app = createApp(App)
app.use(pinia).mount('#app')
