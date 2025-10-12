/**
 * Vite 插件配置工具
 * 用于统一管理和配置 Vite 插件
 */

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import NextDevTools from "vite-plugin-vue-devtools";
/**
 * 创建 Vite 插件配置
 * 根据环境变量动态配置插件
 *
 * 插件列表：
 * 1. Vue 相关插件
 * 2. 开发工具插件
 * 3. 代码质量插件
 * 4. 构建优化插件
 * 5. 功能增强插件
 *
 * @param {Object} viteEnv - 环境变量对象
 * @returns {Array} 插件配置数组
 */
export const createVitePlugins = viteEnv => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_DEVTOOLS, VITE_CODEINSPECTOR } = viteEnv;

  return [
    // Vue 3 支持插件
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // Vue JSX/TSX 语法支持
    // 允许在 Vue 组件中使用 JSX 语法
    vueJsx(),

    // Vue 开发工具
    // 提供 Vue 组件的调试和开发体验
    VITE_DEVTOOLS && NextDevTools({ launchEditor: "code" }),

    // ESLint 插件
    // 在浏览器中显示 ESLint 错误信息
    eslintPlugin(),

    // Vue 组件名称扩展
    // 允许在 script 标签上直接写 name 属性
    vueSetupExtend({}),

    // 创建压缩配置
    // 根据环境变量配置不同的压缩方式
    createCompression(viteEnv),

    // HTML 插件
    // 注入变量到 HTML 文件中
    createHtmlPlugin({
      minify: true, // 压缩 HTML
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),

    // SVG 图标插件
    // 支持 SVG 图标的使用
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),

    // 包分析插件
    // 生成依赖包大小分析报告，用于优化
    VITE_REPORT &&
      visualizer({
        filename: "stats.html",
        gzipSize: true,
        brotliSize: true
      }),

    // 代码检查器插件
    // 自动在 IDE 中定位 DOM 对应的源代码位置
    // 参考: https://inspector.fe-dev.cn/guide/start.html
    VITE_CODEINSPECTOR &&
      codeInspectorPlugin({
        bundler: "vite"
      })
  ];
};

/**
 * 创建压缩配置
 * 根据环境变量配置生成不同的压缩规则
 *
 * 支持的压缩方式：
 * 1. gzip: 使用 gzip 压缩
 * 2. brotli: 使用 brotli 压缩
 *
 * 配置方式：
 * VITE_BUILD_COMPRESS=gzip,brotli
 * VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=true
 *
 * @param {Object} viteEnv - 环境变量对象
 * @returns {Array|Object} 压缩插件配置
 */
const createCompression = viteEnv => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

  // 解析压缩配置
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];

  // 配置 gzip 压缩
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz", // 压缩文件扩展名
        algorithm: "gzip", // 压缩算法
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE // 是否删除原文件
      })
    );
  }

  // 配置 brotli 压缩
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br", // 压缩文件扩展名
        algorithm: "brotliCompress", // 压缩算法
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE // 是否删除原文件
      })
    );
  }

  return plugins;
};

/**
 * 插件配置说明：
 *
 * 1. Vue 插件：
 *    - @vitejs/plugin-vue: Vue 3 支持
 *    - @vitejs/plugin-vue-jsx: JSX 语法支持
 *
 * 2. 开发工具：
 *    - vite-plugin-vue-devtools: Vue 开发工具
 *    - vite-plugin-eslint: ESLint 集成
 *    - code-inspector-plugin: 代码检查器
 *
 * 3. 构建优化：
 *    - vite-plugin-compression: 文件压缩
 *    - rollup-plugin-visualizer: 包分析
 *
 * 4. 功能增强：
 *    - vite-plugin-html: HTML 处理
 *    - vite-plugin-svg-icons: SVG 图标
 *    - unplugin-vue-setup-extend-plus: 组件名扩展
 */

/**
 * 使用示例：
 *
 * // 在 vite.config.js 中使用
 * import { createVitePlugins } from './build/plugins';
 *
 * export default defineConfig(({ mode }) => {
 *   const viteEnv = wrapperEnv(loadEnv(mode, process.cwd()));
 *
 *   return {
 *     plugins: createVitePlugins(viteEnv)
 *   };
 * });
 *
 * // 环境变量配置示例：
 * // .env.development
 * VITE_DEVTOOLS=true
 * VITE_CODEINSPECTOR=true
 *
 * // .env.production
 * VITE_BUILD_COMPRESS=gzip,brotli
 * VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=true
 * VITE_REPORT=true
 */
