import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // Tùy chỉnh các biến của Ant Design tại đây
          '@primary-color': '#1890ff',
        },
        javascriptEnabled: true,
      },
    },
  },
})
