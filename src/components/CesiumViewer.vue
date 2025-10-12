<template>
  <div class="cesium-container">
    <div ref="viewerContainer" id="viewerContainer" class="viewerContainer"></div>
    <div class="cesium-controls">
      <el-button type="primary" @click="flyToHome">回到首页</el-button>
      <el-button @click="addSampleEntity">添加示例实体</el-button>
      <el-button @click="clearEntities">清空实体</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useCesiumViewerStore } from '@/stores/modules/cesiumViewer'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// 响应式引用
const viewerContainer = ref(null)
const cesiumStore = useCesiumViewerStore()

// 计算属性
const isViewerReady = computed(() => cesiumStore.isViewerReady)

// 窗口大小变化监听
const handleResize = () => {
  if (cesiumStore.viewer) {
    cesiumStore.viewer.resize()
  }
}

// 组件挂载时初始化 Viewer
onMounted(async () => {
  // 添加窗口大小监听
  window.addEventListener('resize', handleResize)

  if (viewerContainer.value) {
    try {
      // 初始化 Cesium Viewer
      await cesiumStore.initViewer(viewerContainer.value, {
        // 可以在这里添加自定义配置
        terrainProvider: undefined, // 使用默认地形
        skyBox: undefined, // 使用默认天空盒
      })

      console.log('Cesium Viewer 初始化完成', cesiumStore)

      // 确保 viewer 正确调整尺寸
      setTimeout(() => {
        if (cesiumStore.viewer) {
          cesiumStore.viewer.resize()
        }
      }, 100)
    } catch (error) {
      console.error('Cesium Viewer 初始化失败:', error)
    }
  }
})

// 组件卸载时清理
onUnmounted(() => {
  // 移除窗口大小监听
  window.removeEventListener('resize', handleResize)
  cesiumStore.destroyViewer()
})

// 方法
const flyToHome = () => {
  if (cesiumStore.viewer) {
    cesiumStore.viewer.camera.flyHome()
  }
}

const addSampleEntity = () => {
  if (cesiumStore.viewer) {
    const entity = cesiumStore.viewer.entities.add({
      name: '示例点',
      position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 1000),
      point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: '北京',
        font: '14pt sans-serif',
        pixelOffset: new Cesium.Cartesian2(0, -40),
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      },
    })

    // // 飞行到实体位置
    // cesiumStore.viewer.camera.flyTo({
    //   destination: entity.position,
    //   duration: 2.0,
    // })
  }
}

const clearEntities = () => {
  if (cesiumStore.viewer) {
    cesiumStore.viewer.entities.removeAll()
  }
}
</script>

<style scoped>
.cesium-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

.viewerContainer {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

.cesium-controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  display: flex;
  gap: 10px;
}

/* .cesium-controls button {
  padding: 8px 16px;
  background: rgba(42, 42, 42, 0.8);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cesium-controls button:hover {
  background: rgba(42, 42, 42, 0.9);
} */
</style>
