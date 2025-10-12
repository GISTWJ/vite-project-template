/**
 * HTTP相关枚举定义 - JavaScript版本
 * 定义请求状态码、请求方法、内容类型等常量
 */

/**
 * 请求状态码枚举
 * 定义常用的HTTP状态码和业务状态码
 */
export const ResultEnum = {
  SUCCESS: 200, // 请求成功
  ERROR: 500, // 服务器错误
  OVERDUE: 401, // 登录过期/未授权
  TIMEOUT: 30000, // 请求超时时间（30秒）
  TYPE: 'success' // 成功类型标识
}

/**
 * HTTP请求方法枚举
 * 定义支持的HTTP请求方法
 */
export const RequestEnum = {
  GET: 'GET', // 获取资源
  POST: 'POST', // 创建资源
  PATCH: 'PATCH', // 部分更新资源
  PUT: 'PUT', // 完全更新资源
  DELETE: 'DELETE' // 删除资源
}

/**
 * 内容类型枚举
 * 定义常用的Content-Type类型
 */
export const ContentTypeEnum = {
  // JSON格式
  JSON: 'application/json;charset=UTF-8',

  // 纯文本格式
  TEXT: 'text/plain;charset=UTF-8',

  // 表单编码格式（一般配合qs使用）
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',

  // 表单数据格式（用于文件上传）
  FORM_DATA: 'multipart/form-data;charset=UTF-8'
}

/**
 * 使用示例：
 *
 * // 在axios配置中使用
 * const config = {
 *   headers: {
 *     'Content-Type': ContentTypeEnum.JSON
 *   }
 * };
 *
 * // 在状态判断中使用
 * if (response.code === ResultEnum.SUCCESS) {
 *   // 处理成功响应
 * }
 *
 * // 在请求方法中使用
 * const method = RequestEnum.POST;
 *
 * // 设置超时时间
 * const timeout = ResultEnum.TIMEOUT;
 */
