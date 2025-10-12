/**
 * Axios请求取消管理器
 * 用于管理重复请求的取消，避免重复请求造成的数据混乱
 */

import qs from "qs";

// 存储待处理的请求，key为请求标识，value为AbortController实例
const pendingMap = new Map();

/**
 * 序列化参数，确保对象属性顺序一致
 * 这样可以保证相同参数的请求生成相同的key
 * @param {any} obj - 要序列化的对象
 * @returns {string} 序列化后的字符串
 */
const sortedStringify = obj => {
  return qs.stringify(obj, {
    arrayFormat: "repeat",
    sort: (a, b) => a.localeCompare(b)
  });
};

/**
 * 生成请求的唯一标识
 * 通过请求方法、URL、参数等生成唯一key
 * @param {object} config - axios请求配置
 * @returns {string} 请求的唯一标识
 */
export const getPendingUrl = config => {
  return [config.method, config.url, sortedStringify(config.data), sortedStringify(config.params)].join("&");
};

/**
 * AxiosCanceler 类
 * 管理请求的取消操作
 */
export class AxiosCanceler {
  /**
   * 添加请求到待处理列表
   * 如果存在相同请求，会先取消之前的请求
   * @param {object} config - axios请求配置
   * @returns {void}
   */
  addPending(config) {
    // 先移除可能存在的相同请求
    this.removePending(config);

    // 生成请求的唯一标识
    const url = getPendingUrl(config);

    // 创建AbortController用于取消请求
    const controller = new AbortController();

    // 将signal添加到请求配置中
    config.signal = controller.signal;

    // 将请求添加到待处理列表
    pendingMap.set(url, controller);
  }

  /**
   * 移除请求
   * 取消请求并从待处理列表中删除
   * @param {object} config - axios请求配置
   * @returns {void}
   */
  removePending(config) {
    const url = getPendingUrl(config);

    // 获取对应的AbortController
    const controller = pendingMap.get(url);

    if (controller) {
      // 取消请求
      controller.abort();
      // 从待处理列表中删除
      pendingMap.delete(url);
    }
  }

  /**
   * 清空所有待处理的请求
   * 通常在页面卸载或路由切换时调用
   * @returns {void}
   */
  removeAllPending() {
    // 遍历所有待处理的请求并取消
    pendingMap.forEach(controller => {
      if (controller) {
        controller.abort();
      }
    });

    // 清空待处理列表
    pendingMap.clear();
  }

  /**
   * 获取当前待处理请求的数量
   * @returns {number} 待处理请求的数量
   */
  getPendingCount() {
    return pendingMap.size;
  }

  /**
   * 检查是否存在指定的待处理请求
   * @param {object} config - axios请求配置
   * @returns {boolean} 是否存在待处理请求
   */
  hasPending(config) {
    const url = getPendingUrl(config);
    return pendingMap.has(url);
  }
}

/**
 * 使用说明：
 *
 * 1. 自动取消重复请求：
 *    - 当发起相同请求时，会自动取消之前的请求
 *    - 通过请求方法、URL、参数生成唯一标识
 *
 * 2. 手动管理：
 *    const canceler = new AxiosCanceler();
 *    canceler.addPending(config);     // 添加请求
 *    canceler.removePending(config);  // 移除请求
 *    canceler.removeAllPending();     // 清空所有请求
 *
 * 3. 在组件卸载时清空请求：
 *    onUnmounted(() => {
 *      canceler.removeAllPending();
 *    });
 */
