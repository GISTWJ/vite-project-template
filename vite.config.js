import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { wrapperEnv } from "./build/getEnv";
import { createVitePlugins } from "./build/plugins";
import { createProxy } from "./build/proxy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv),
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      }
    },
    // Cesium 配置
    define: {
      // 设置 Cesium 基础 URL
      CESIUM_BASE_URL: JSON.stringify("https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/")
    },
    build: {
      // // 确保 Cesium 资源正确复制
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       cesium: ["cesium"]
      //     }
      //   }
      // }
      outDir: "dist",
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
      fs: {
        // 允许访问 Cesium 的静态资源
        allow: [".."]
      }
    },

    optimizeDeps: {
      include: ["cesium"]
    }
  };
});
