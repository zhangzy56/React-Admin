import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "@/style/variable.less";
          @import "@/style/mixin.less";
        `
      }
    }
  },
  server: {
    open: true, // 自动开启窗口
    host: true, // 监听本地所有IP
    port: 7577,
    proxy: {
      // easy-mock 官网 https://mock.mengxuegu.com   github地址: https://github.com/easy-mock/easy-mock
      '/api': {
        // target: 'https://mock.mengxuegu.com/mock/6396dc5c2e0f396e51a5c50f', // easymock
        // target: 'http://10.10.10.185:9501',
        target: 'http://10.10.10.49/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()]
})
