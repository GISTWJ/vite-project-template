import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { Viewer } from 'cesium'

export const useCesiumViewerStore = defineStore('cesium', {
  state: () => ({
    // 使用 shallowRef 避免 Vue 对 Cesium Viewer 实例进行深度响应式劫持
    viewer: shallowRef(null),
    // 存储一些可以持久化的配置信息
    viewerConfig: {
      homePosition: null,
      cameraPosition: null,
      selectedEntity: null
      // 其他可以序列化的配置
    }
  }),

  getters: {
    isViewerReady: state => state.viewer !== null,
    getViewer: state => state.viewer,
    getCameraPosition: state => {
      if (state.viewer) {
        const { camera } = state.viewer
        return {
          position: camera.position.clone(),
          heading: camera.heading,
          pitch: camera.pitch,
          roll: camera.roll
        }
      }
      return null
    }
  },

  actions: {
    /**
     * 初始化 Cesium Viewer
     * @param {HTMLElement} container - DOM容器元素
     * @param {Object} options - Viewer配置选项
     */
    initViewer(container, options = {}) {
      if (this.viewer) {
        console.warn('Viewer already initialized')
        return this.viewer
      }

      const defaultOptions = {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: true,
        shouldAnimate: true,
        ...options
      }

      try {
        this.viewer = new Viewer(container, defaultOptions)

        // 设置初始相机位置（如果有保存的配置）
        if (this.viewerConfig.cameraPosition) {
          this.viewer.camera.setView({
            destination: this.viewerConfig.cameraPosition.position,
            orientation: {
              heading: this.viewerConfig.cameraPosition.heading,
              pitch: this.viewerConfig.cameraPosition.pitch,
              roll: this.viewerConfig.cameraPosition.roll
            }
          })
        }

        // 监听相机变化，保存位置信息
        this.viewer.camera.moveEnd.addEventListener(() => {
          this.saveCameraPosition()
        })

        console.log('Cesium Viewer initialized successfully')
        return this.viewer
      } catch (error) {
        console.error('Failed to initialize Cesium Viewer:', error)
        throw error
      }
    },

    /**
     * 销毁 Viewer 实例
     */
    destroyViewer() {
      if (this.viewer) {
        this.viewer.destroy()
        this.viewer = null
        console.log('Cesium Viewer destroyed')
      }
    },

    /**
     * 保存相机位置
     */
    saveCameraPosition() {
      if (this.viewer) {
        const { camera } = this.viewer
        this.viewerConfig.cameraPosition = {
          position: camera.position.clone(),
          heading: camera.heading,
          pitch: camera.pitch,
          roll: camera.roll
        }
      }
    },

    /**
     * 设置相机位置
     * @param {Object} position - 相机位置信息
     */
    setCameraPosition(position) {
      if (this.viewer && position) {
        this.viewer.camera.setView({
          destination: position.position,
          orientation: {
            heading: position.heading,
            pitch: position.pitch,
            roll: position.roll
          }
        })
      }
    },

    /**
     * 添加实体到场景
     * @param {Object} entity - 实体对象
     */
    addEntity(entity) {
      if (this.viewer) {
        return this.viewer.entities.add(entity)
      }
      return null
    },

    /**
     * 移除实体
     * @param {Object} entity - 实体对象
     */
    removeEntity(entity) {
      if (this.viewer) {
        this.viewer.entities.remove(entity)
      }
    },

    /**
     * 清空所有实体
     */
    clearEntities() {
      if (this.viewer) {
        this.viewer.entities.removeAll()
      }
    },

    /**
     * 飞行到指定位置
     * @param {Object} destination - 目标位置
     * @param {Number} duration - 飞行时间（秒）
     */
    flyTo(destination, duration = 2.0) {
      if (this.viewer) {
        this.viewer.camera.flyTo({
          destination,
          duration
        })
      }
    }
  },

  // 持久化配置 - 只持久化可序列化的配置信息，不持久化 Viewer 实例
  persist: {
    key: 'cesium-store',
    storage: localStorage,
    paths: ['viewerConfig'] // 只持久化配置信息，不持久化 viewer 实例
  }
})
