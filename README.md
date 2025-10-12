# Vue 3 + Cesium + Pinia 三维地球应用

一个基于 Vue 3、Cesium、Pinia 和 Element Plus 的现代化三维地球可视化应用，支持全球地理数据展示、实体管理和状态持久化。

## ✨ 特性

- 🌍 **三维地球可视化** - 基于 Cesium 的高性能三维地球渲染
- ⚡ **Vue 3 + Vite** - 现代化的前端开发体验
- 🗃️ **Pinia 状态管理** - 使用 Pinia 进行全局状态管理
- 💾 **状态持久化** - 支持相机位置等状态的本地存储
- 🎨 **Element Plus UI** - 美观的现代化 UI 组件
- 📱 **响应式设计** - 支持窗口大小变化和移动端适配
- 🔧 **TypeScript 支持** - 完整的类型定义和智能提示

## 🚀 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 7
- **三维引擎**: Cesium 1.120
- **状态管理**: Pinia 3
- **UI 组件库**: Element Plus 2
- **样式**: CSS3 + Scoped CSS
- **包管理器**: pnpm

## 📦 项目结构

```
vite-project/
├── public/                 # 静态资源
├── src/
│   ├── components/         # Vue 组件
│   │   └── CesiumViewer.vue    # Cesium 三维地球组件
│   ├── stores/            # Pinia 状态管理
│   │   ├── modules/
│   │   │   └── cesiumViewer.js  # Cesium 相关状态
│   │   └── index.js            # Pinia 配置
│   ├── config/            # 配置文件
│   │   └── cesium-config.js    # Cesium 配置
│   ├── App.vue            # 根组件
│   ├── main.js            # 应用入口
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── vite.config.js         # Vite 配置
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 🛠️ 安装和运行

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0 (推荐)

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 或
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 生产构建

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 🔧 配置说明

### Cesium 配置

项目使用 CDN 方式加载 Cesium 资源，配置位于 `vite.config.js`：

```javascript
define: {
  CESIUM_BASE_URL: JSON.stringify('https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/'),
}
```

### Ion 访问令牌

在 `src/config/cesium-config.js` 中配置你的 Cesium Ion 访问令牌：

```javascript
Ion.defaultAccessToken = 'your_actual_token_here'
```

### 状态持久化

使用 `pinia-plugin-persistedstate` 插件实现状态持久化：

```javascript
// 只持久化可序列化的配置信息
persist: {
  key: 'cesium-store',
  storage: localStorage,
  paths: ['viewerConfig']
}
```

## 📝 使用示例

### 基本使用

```vue
<template>
  <CesiumViewer />
</template>

<script setup>
import CesiumViewer from './components/CesiumViewer.vue'
</script>
```

### 添加实体

```javascript
// 添加一个点实体
const entity = cesiumStore.addEntity({
  name: '示例点',
  position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 1000),
  point: {
    pixelSize: 10,
    color: Cesium.Color.YELLOW,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 2,
  }
})
```

### 相机控制

```javascript
// 飞行到指定位置
cesiumStore.flyTo(destination, 2.0)

// 回到首页
cesiumStore.viewer.camera.flyHome()

// 保存当前视角
cesiumStore.saveCameraPosition()
```

## 🎨 自定义样式

项目使用 Scoped CSS 进行样式隔离，主要样式类：

- `.cesium-container` - 主容器
- `.viewerContainer` - Cesium 渲染容器
- `.cesium-controls` - 控制按钮区域

## 🐛 常见问题

### 1. Cesium 资源加载失败

确保网络连接正常，或配置本地 Cesium 资源路径。

### 2. 地图显示为 300x150

检查容器 CSS 样式，确保设置了正确的宽高。

### 3. 实体添加失败

检查 Cesium 对象构造参数，确保所有必需参数都已提供。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request
