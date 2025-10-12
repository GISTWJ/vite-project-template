/**
 * 网络请求状态码检查工具
 * 根据HTTP状态码显示相应的错误信息
 */
import { ElMessage } from "element-plus";

/**
 * 校验网络请求状态码
 * @param {number} status - HTTP状态码
 * @returns {void}
 */
export const checkStatus = status => {
  switch (status) {
    case 400:
      ElMessage.error("请求失败！请您稍后重试");
      break;
    case 401:
      ElMessage.error("登录失效！请您重新登录");
      break;
    case 403:
      ElMessage.error("当前账号无权限访问！");
      break;
    case 404:
      ElMessage.error("你所访问的资源不存在！");
      break;
    case 405:
      ElMessage.error("请求方式错误！请您稍后重试");
      break;
    case 408:
      ElMessage.error("请求超时！请您稍后重试");
      break;
    case 500:
      ElMessage.error("服务异常！");
      break;
    case 502:
      ElMessage.error("网关错误！");
      break;
    case 503:
      ElMessage.error("服务不可用！");
      break;
    case 504:
      ElMessage.error("网关超时！");
      break;
    default:
      ElMessage.error("请求失败！");
  }
};

/**
 * 状态码说明：
 * 400 - Bad Request: 客户端请求语法错误
 * 401 - Unauthorized: 未授权，需要登录
 * 403 - Forbidden: 服务器拒绝请求，权限不足
 * 404 - Not Found: 请求的资源不存在
 * 405 - Method Not Allowed: 请求方法不被允许
 * 408 - Request Timeout: 请求超时
 * 500 - Internal Server Error: 服务器内部错误
 * 502 - Bad Gateway: 网关错误
 * 503 - Service Unavailable: 服务不可用
 * 504 - Gateway Timeout: 网关超时
 */
