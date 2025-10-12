// Cesium 配置文件
import { Ion } from "cesium";

// 设置 Ion 访问令牌
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYTVhNjE0YS02YWVhLTQxNTAtYWI5NS1jYzUwMzliNmRjYjciLCJpZCI6OTc4NDgsImlhdCI6MTY1NTM4NDM0OH0.aT_4OCAgJ95R0l6Tg--u4jo9Ky6TlFa40p-8OxzYy2M";

// 设置 Cesium 基础路径
if (typeof window !== "undefined") {
  // 使用 CDN 路径
  window.CESIUM_BASE_URL = "https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/";
  window.CESIUM_WORKER_URL = "https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/Workers/cesiumWorker.js";
  window.CESIUM_LIBRARY_BASE_URL = "https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/";
}

export default {
  // 导出配置供其他地方使用
  ionToken: Ion.defaultAccessToken,
  baseUrl: window.CESIUM_BASE_URL
};
