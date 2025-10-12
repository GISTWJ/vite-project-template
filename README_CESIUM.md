# Cesium + Vue 3 + Pinia 集成方案

## 问题解答

对于你提出的问题：**是否可以通过 `shallowRef` 将 Cesium Viewer 取消 Vue 的响应式劫持，然后通过 Pinia 进行持久化？**

**答案：部分正确，但需要特殊处理。**

### 核心要点

1. **使用 `shallowRef` 是正确的** - 可以避免 Vue 对 Cesium Viewer 实例进行深度响应式劫持
2. **不能直接持久化 Viewer 实例** - Cesium Viewer 包含大量不可序列化的对象和方法
3. **只持久化可序列化的配置** - 如相机位置、视角等状态信息

## 实现方案

### 1. Pinia Store 设计

```javascript
// src/stores/modules/cesium.js
import { shallowRef } from 'vue'
import { Viewer } from 'cesium'

export const useCesiumViewerStore = defineStore('cesium', {
  state: () => ({
    // 使用 shallowRef 避免深度响应式劫持
    viewer: shallowRef(null),
    // 只存储可序列化的配置
    viewerConfig: {
      cameraPosition: null,
      // 其他配置...
    }
  }),
  
  // 只持久化配置信息，不持久化 viewer 实例
  persist: {
    paths: ['viewerConfig']
  }
})
```

### 2. 组件中的使用

```vue
<template>
  <div ref="viewerContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCesiumViewerStore } from '@/stores/modules/cesium'

const viewerContainer = ref()
const cesiumStore = useCesiumViewerStore()

onMounted(() => {
  // 初始化 Viewer
  cesiumStore.initViewer(viewerContainer.value)
})

onUnmounted(() => {
  // 清理资源
  cesiumStore.destroyViewer()
})
</script>
```

## 关键优势

### 1. 避免响应式劫持
- `shallowRef` 确保 Cesium Viewer 不会被 Vue 的响应式系统深度劫持
- 保持 Cesium 实例的原生性能

### 2. 全局状态管理
- 通过 Pinia 可以在任何组件中访问 Viewer 实例
- 统一管理 Cesium 相关的状态和操作

### 3. 智能持久化
- 只持久化可序列化的配置信息
- 页面刷新后可以恢复相机位置等状态
- 避免序列化复杂的 Viewer 实例

### 4. 内存管理
- 提供 `destroyViewer()` 方法正确清理资源
- 避免内存泄漏

## 使用示例

### 在任意组件中访问 Viewer

```javascript
// 任何组件中
import { useCesiumViewerStore } from '@/stores/modules/cesium'

const cesiumStore = useCesiumViewerStore()

// 添加实体
const entity = cesiumStore.addEntity({
  position: Cesium.Cartesian3.fromDegrees(116.39, 39.9),
  point: { pixelSize: 10, color: Cesium.Color.RED }
})

// 飞行到位置
cesiumStore.flyTo(destination, 2.0)

// 保存当前视角
cesiumStore.saveCameraPosition()
```

## 安装和配置

1. 安装依赖：
```bash
pnpm add cesium
```

2. 配置 Vite（已包含在 `vite.config.js` 中）

3. 在组件中使用 CesiumViewer 组件

## 注意事项

1. **不要直接持久化 Viewer 实例** - 会导致序列化错误
2. **正确清理资源** - 组件卸载时调用 `destroyViewer()`
3. **只持久化必要信息** - 如相机位置、用户配置等
4. **使用 shallowRef** - 避免深度响应式劫持影响性能

这种方案既保持了 Cesium 的原生性能，又提供了 Vue 生态的便利性和 Pinia 的全局状态管理能力。
