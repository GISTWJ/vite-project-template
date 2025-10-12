import { createApp } from "vue";
// pinia store
import pinia from "@/stores";
import "./style.css";

import App from "./App.vue";

// 导入 Cesium 配置
import "./config/cesium-config";

const app = createApp(App);
app.use(pinia).mount("#app");
