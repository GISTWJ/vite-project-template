/**
 * @description：请求配置
 */
const ResultEnum = {
  SUCCESS: 200,
  ERROR: 500,
  OVERDUE: 401,
  TIMEOUT: 30000, // 请求超时，单位为毫秒
  TYPE: 'success',
}

/**
 * @description：请求方法
 */
const RequestEnum = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

/**
 * @description：常用的 contentType 类型
 */
const ContentTypeEnum = {
  // json 格式，适用于大多数请求
  JSON: 'application/json;charset=UTF-8',
  // 纯文本格式
  TEXT: 'text/plain;charset=UTF-8',
  // 表单提交，一般配合 qs 库使用
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  // 文件上传
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
}

export { ResultEnum, RequestEnum, ContentTypeEnum }
