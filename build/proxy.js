/**
 * 代理配置工具
 * 用于创建 Vite 开发服务器的代理配置
 */

/**
 * 创建代理配置
 * 用于解析 .env.development 中的代理配置
 *
 * 代理配置格式：
 * VITE_PROXY=[["/api", "http://localhost:8080"], ["/upload", "http://localhost:3001"]]
 *
 * 功能说明：
 * 1. 支持 HTTP 和 HTTPS 代理
 * 2. 自动处理路径重写
 * 3. 支持 WebSocket 代理
 * 4. 自动处理跨域问题
 *
 * @param {Array<Array<string>>} list - 代理配置列表，格式为 [["前缀", "目标地址"]]
 * @returns {Object} Vite 代理配置对象
 *
 * @example
 * const proxy = createProxy([
 *   ["/api", "http://localhost:8080"],
 *   ["/upload", "https://api.example.com"]
 * ]);
 */
export function createProxy(list = []) {
  const ret = {};

  // 遍历代理配置列表
  for (const [prefix, target] of list) {
    // 检查是否为 HTTPS 地址
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);

    // 创建代理配置对象
    // 参考: https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      // 目标服务器地址
      target: target,

      // 改变请求头中的 origin 字段为目标 URL
      // 解决跨域问题
      changeOrigin: true,

      // 支持 WebSocket 代理
      ws: true,

      // 路径重写规则
      // 将请求路径中的前缀替换为空字符串
      // 例如：/api/users -> /users
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),

      // HTTPS 代理需要设置 secure: false
      // 避免 SSL 证书验证问题
      ...(isHttps ? { secure: false } : {})
    };
  }

  return ret;
}

/**
 * 代理配置详解：
 *
 * 1. target: 目标服务器地址
 *    - 可以是 HTTP 或 HTTPS 地址
 *    - 支持域名和 IP 地址
 *
 * 2. changeOrigin: 改变请求头中的 origin
 *    - true: 将请求头中的 origin 改为目标地址
 *    - false: 保持原始 origin
 *    - 通常设置为 true 解决跨域问题
 *
 * 3. ws: WebSocket 支持
 *    - true: 支持 WebSocket 代理
 *    - false: 不支持 WebSocket
 *    - 开发时通常需要设置为 true
 *
 * 4. rewrite: 路径重写
 *    - 函数形式，接收原始路径，返回重写后的路径
 *    - 用于移除代理前缀，避免目标服务器收到带前缀的路径
 *
 * 5. secure: SSL 证书验证
 *    - true: 验证 SSL 证书（默认）
 *    - false: 不验证 SSL 证书
 *    - 开发环境通常设置为 false
 */

/**
 * 使用示例：
 *
 * // 在 .env.development 文件中配置
 * VITE_PROXY=[["/api", "http://localhost:8080"], ["/upload", "https://api.example.com"]]
 *
 * // 在 vite.config.js 中使用
 * import { createProxy } from './build/proxy';
 *
 * export default defineConfig({
 *   server: {
 *     proxy: createProxy(viteEnv.VITE_PROXY)
 *   }
 * });
 *
 * // 实际效果：
 * // 请求 /api/users -> 代理到 http://localhost:8080/users
 * // 请求 /upload/file -> 代理到 https://api.example.com/file
 */

/**
 * 常见代理场景：
 *
 * 1. API 代理：
 *    ["/api", "http://localhost:3000"]
 *
 * 2. 文件上传代理：
 *    ["/upload", "http://localhost:8080"]
 *
 * 3. 静态资源代理：
 *    ["/static", "http://localhost:9000"]
 *
 * 4. 多个服务代理：
 *    [
 *      ["/api", "http://localhost:3000"],
 *      ["/admin", "http://localhost:3001"],
 *      ["/upload", "http://localhost:3002"]
 *    ]
 */
