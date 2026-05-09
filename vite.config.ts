
import { defineConfig } from 'vite'
// 注意：在导入 devConfig 和 prodConfig 配置时，模块名后面不要带 .ts 的后缀名
import devConfig from './vite.dev.config'
import prodConfig from './vite.prod.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return mode === 'development' ? devConfig : prodConfig
})