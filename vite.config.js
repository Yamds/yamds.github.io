import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/', // 确保 base 配置正确
  build: {
    assetsDir: 'assets', // 静态资源目录
  },
}) 