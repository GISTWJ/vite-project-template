import { resolve } from 'path' // 从 Node.js 导入路径工具，用于创建别名的绝对路径
import { defineConfig, loadEnv } from 'vite' // defineConfig 提供类型提示，loadEnv 用于按模式加载 .env*
import { wrapperEnv } from './build/getEnv' // 自定义封装：将 .env 字符串转换为布尔/数字等
import { createVitePlugins } from './build/plugins' // 自定义插件集合工厂函数
import { createProxy } from './build/proxy' // 自定义代理创建函数（从 env 读取并解析）

export default defineConfig(({ mode }) => {
  // 导出按模式生成的 Vite 配置
  const root = process.cwd() // 项目根目录（当前工作目录）
  const env = loadEnv(mode, root) // 加载对应模式的环境变量（.env、.env.*）
  const viteEnv = wrapperEnv(env) // 规范化环境变量类型与默认值

  return {
    // 使用已在 wrapperEnv 中规范化的公共路径（确保以 / 结尾）
    base: viteEnv.VITE_PUBLIC_PATH, // 部署基础路径（如 CDN 前缀/子路径）
    root, // 项目根目录
    plugins: createVitePlugins(viteEnv), // 使用自定义工厂注册 vite/rollup 插件
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 路径别名：'@' 指向 src 目录
      }
    },
    build: {
      outDir: 'dist', // 打包输出目录
      // 开发使用 esbuild，生产使用 terser 以剔除日志
      minify: mode === 'production' ? 'terser' : 'esbuild', // 生产用 terser 以便深度压缩
      terserOptions:
        mode === 'production'
          ? {
              compress: {
                drop_console: !!viteEnv.VITE_DROP_CONSOLE, // 控制是否移除 console.*
                drop_debugger: true // 移除 debugger
              }
            }
          : undefined, // 非生产无需传递 terser 配置
      // 通过环境变量 VITE_BUILD_SOURCEMAP 控制是否生成 sourcemap
      sourcemap: !!viteEnv.VITE_BUILD_SOURCEMAP,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false, // 不计算 gzip 大小，加快构建
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000, // 调高警告阈值，配合可视化分析
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js', // 代码分块命名
          entryFileNames: 'assets/js/[name]-[hash].js', // 入口文件命名
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]' // 资源文件命名（按扩展名分目录）
        }
      }
    },
    server: {
      host: '0.0.0.0', // 监听所有网络地址，便于局域网设备访问
      port: viteEnv.VITE_PORT, // 开发服务器端口
      open: viteEnv.VITE_OPEN, // 启动后是否自动打开浏览器
      cors: true, // 允许跨域（开发调试常用）
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY), // 根据 env 创建代理转发规则
      fs: {
        // 允许访问 Cesium 的静态资源
        allow: ['..'] // 放开上级目录访问（建议收紧到具体需要的目录）
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;` // 全局注入变量与混入
        }
      }
    }
  }
})
