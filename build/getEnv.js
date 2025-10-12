/**
 * 环境变量处理工具
 * 用于处理 Vite 环境变量和模式判断
 */

import path from "path";

/**
 * 判断是否为开发模式
 * @param {string} mode - 运行模式
 * @returns {boolean} 是否为开发模式
 */
export function isDevFn(mode) {
  return mode === "development";
}

/**
 * 判断是否为生产模式
 * @param {string} mode - 运行模式
 * @returns {boolean} 是否为生产模式
 */
export function isProdFn(mode) {
  return mode === "production";
}

/**
 * 判断是否为测试模式
 * @param {string} mode - 运行模式
 * @returns {boolean} 是否为测试模式
 */
export function isTestFn(mode) {
  return mode === "test";
}

/**
 * 判断是否生成包预览报告
 * 通过环境变量 VITE_REPORT 控制
 * @returns {boolean} 是否生成报告
 */
export function isReportMode() {
  return process.env.VITE_REPORT === "true";
}

/**
 * 包装环境变量配置
 * 读取所有环境变量配置文件并处理到 process.env
 *
 * 主要功能：
 * 1. 处理换行符转义
 * 2. 转换布尔值字符串
 * 3. 转换数字类型
 * 4. 解析JSON字符串
 *
 * @param {Object} envConf - 环境变量配置对象
 * @returns {Object} 处理后的环境变量对象
 */
export function wrapperEnv(envConf) {
  const ret = {};

  // 遍历所有环境变量
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName];

    // 处理换行符转义
    realName = realName.replace(/\\n/g, "\n");

    // 转换布尔值字符串
    if (realName === "true") {
      realName = true;
    } else if (realName === "false") {
      realName = false;
    }

    // 特殊处理端口号，转换为数字
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }

    // 特殊处理代理配置，解析JSON字符串
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        // 如果解析失败，保持原值
        console.warn(`Failed to parse ${envName}:`, error.message);
      }
    }

    ret[envName] = realName;
  }

  return ret;
}

/**
 * 获取用户根目录路径
 * 用于构建绝对路径
 *
 * @param {...string} dir - 目录路径参数
 * @returns {string} 解析后的绝对路径
 *
 * @example
 * getRootPath('src', 'components') // 返回 /project/src/components
 * getRootPath('dist') // 返回 /project/dist
 */
export function getRootPath(...dir) {
  return path.resolve(process.cwd(), ...dir);
}

/**
 * 使用示例：
 *
 * // 模式判断
 * if (isDevFn(process.env.NODE_ENV)) {
 *   console.log('开发模式');
 * }
 *
 * // 环境变量处理
 * const env = wrapperEnv({
 *   VITE_PORT: '3000',
 *   VITE_OPEN: 'true',
 *   VITE_PROXY: '[["/api", "http://localhost:8080"]]'
 * });
 *
 * // 获取路径
 * const srcPath = getRootPath('src');
 * const distPath = getRootPath('dist');
 */
