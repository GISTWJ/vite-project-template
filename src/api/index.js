/**
 * Axios 请求封装 - JavaScript版本
 * 功能：统一处理HTTP请求，包括请求拦截、响应拦截、错误处理、loading状态管理等
 */

import { showFullScreenLoading, tryHideFullScreenLoading } from "@/components/Loading/fullScreen";
import { LOGIN_URL } from "@/config";
import router from "@/routers";
import { useUserStore } from "@/stores/modules/user";
import axios from "axios";
import { ElMessage } from "element-plus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { checkStatus } from "./helper/checkStatus";

// 请求状态码枚举
const ResultEnum = {
  SUCCESS: 200, // 请求成功
  ERROR: 500, // 服务器错误
  OVERDUE: 401, // 登录过期
  TIMEOUT: 30000, // 请求超时时间（30秒）
  TYPE: "success" // 成功类型
};

// 基础配置对象
const config = {
  // 默认请求地址，可通过环境变量修改
  baseURL: import.meta.env.VITE_API_URL,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT,
  // 跨域时允许携带凭证（cookies等）
  withCredentials: true
};

// 创建请求取消器实例
const axiosCanceler = new AxiosCanceler();

/**
 * RequestHttp 类 - 封装axios请求
 * 主要功能：
 * 1. 统一配置axios实例
 * 2. 请求拦截器：添加token、loading状态、请求取消等
 * 3. 响应拦截器：统一处理响应数据、错误处理等
 * 4. 提供常用的HTTP方法封装
 */
class RequestHttp {
  constructor(config) {
    // 创建axios实例
    this.service = axios.create(config);
    /**
     * 请求拦截器
     * 在请求发送前执行，用于：
     * - 添加认证token
     * - 控制loading状态
     * - 管理重复请求取消
     */
    this.service.interceptors.request.use(
      config => {
        // 获取用户store实例
        const userStore = useUserStore();
        // 设置请求取消功能（默认为true，可通过cancel: false禁用）
        config.cancel = config.cancel !== false;
        // 如果启用取消功能，将请求添加到待处理列表
        if (config.cancel) {
          axiosCanceler.addPending(config);
        }
        // 设置loading状态（默认为true，可通过loading: false禁用）
        config.loading = config.loading !== false;
        // 如果启用loading，显示全屏loading
        if (config.loading) {
          showFullScreenLoading();
        }
        // 添加认证token到请求头
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("x-access-token", userStore.token);
        }
        return config;
      },
      error => {
        // 请求配置错误处理
        return Promise.reject(error);
      }
    );

    /**
     * 响应拦截器
     * 在响应返回后执行，用于：
     * - 统一处理响应数据格式
     * - 处理业务错误码
     * - 处理登录过期
     * - 隐藏loading状态
     */
    this.service.interceptors.response.use(
      response => {
        const { data, config } = response;
        const userStore = useUserStore();
        // 从待处理列表中移除当前请求
        axiosCanceler.removePending(config);
        // 隐藏loading状态
        if (config.loading) {
          tryHideFullScreenLoading();
        }
        // 处理登录过期（401状态码）
        if (data.code === ResultEnum.OVERDUE) {
          // 清除token
          userStore.setToken("");
          // 跳转到登录页
          router.replace(LOGIN_URL);
          // 显示错误消息
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 处理业务错误（非200状态码）
        // 注意：下载文件时可能返回数据流，没有code字段，所以需要判断
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 请求成功，返回数据
        return data;
      },
      async error => {
        const { response } = error;
        // 隐藏loading状态
        tryHideFullScreenLoading();
        // 处理网络错误和超时错误
        if (error.message.indexOf("timeout") !== -1) {
          ElMessage.error("请求超时！请您稍后重试");
        }
        if (error.message.indexOf("Network Error") !== -1) {
          ElMessage.error("网络错误！请您稍后重试");
        }
        // 根据HTTP状态码处理错误
        if (response) {
          checkStatus(response.status);
        }
        // 处理断网情况
        if (!window.navigator.onLine) {
          router.replace("/500");
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET请求方法
   * @param {string} url - 请求地址
   * @param {object} params - 查询参数
   * @param {object} _object - 其他配置选项
   * @returns {Promise} 返回Promise对象
   */
  get(url, params = {}, _object = {}) {
    return this.service.get(url, { params, ..._object });
  }

  /**
   * POST请求方法
   * @param {string} url - 请求地址
   * @param {object|string} params - 请求体数据
   * @param {object} _object - 其他配置选项
   * @returns {Promise} 返回Promise对象
   */
  post(url, params = {}, _object = {}) {
    return this.service.post(url, params, _object);
  }

  /**
   * PUT请求方法
   * @param {string} url - 请求地址
   * @param {object} params - 请求体数据
   * @param {object} _object - 其他配置选项
   * @returns {Promise} 返回Promise对象
   */
  put(url, params = {}, _object = {}) {
    return this.service.put(url, params, _object);
  }

  /**
   * DELETE请求方法
   * @param {string} url - 请求地址
   * @param {any} params - 查询参数
   * @param {object} _object - 其他配置选项
   * @returns {Promise} 返回Promise对象
   */
  delete(url, params = {}, _object = {}) {
    return this.service.delete(url, { params, ..._object });
  }

  /**
   * 文件下载方法
   * @param {string} url - 下载地址
   * @param {object} params - 请求参数
   * @param {object} _object - 其他配置选项
   * @returns {Promise<Blob>} 返回Blob对象
   */
  download(url, params = {}, _object = {}) {
    return this.service.post(url, params, {
      ..._object,
      responseType: "blob" // 设置响应类型为blob，用于文件下载
    });
  }
}

// 导出配置好的axios实例
export default new RequestHttp(config);

/**
 * 使用示例：
 *
 * // 基本GET请求
 * import request from '@/api';
 * const data = await request.get('/api/users');
 *
 * // 带参数的GET请求
 * const userData = await request.get('/api/users', { id: 1 });
 *
 * // POST请求
 * const result = await request.post('/api/login', { username: 'admin', password: '123456' });
 *
 * // 禁用loading的请求
 * const data = await request.get('/api/data', {}, { loading: false });
 *
 * // 禁用请求取消的请求
 * const data = await request.get('/api/data', {}, { cancel: false });
 *
 * // 文件下载
 * const blob = await request.download('/api/download/file.pdf');
 *
 * // 错误处理
 * try {
 *   const data = await request.get('/api/data');
 *   console.log(data);
 * } catch (error) {
 *   console.error('请求失败:', error);
 * }
 */
