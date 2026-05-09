//项目发布上线时对应的配置项

import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'


// https://vitejs.dev/config/
const prodConfig: UserConfig = {
    plugins: [react(), visualizer({ open: true }), createHtmlPlugin({
        // 是否针对 html 标签进行代码压缩
        minify: true,
        // 打包的入口
        entry: 'src/main.tsx',
        // 向网页中注入数据
        inject: {
            //真正要注入到网页中的数据
            data: {
                title: '文章后台管理系统'   //标题
            }
        }
    })],
    resolve: {
        alias: {
            // 配置 @ 的路径别名
            '@': join(__dirname, './src/')
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly'
        }
    },
    build: {
        //这是rollup的打包配置项
        rollupOptions: {
            output: {
                // 按照文件类型，组织打包生成的资源文件（css, 图片等）
                assetFileNames: '[ext]/[name]-[hash][extname]',
                // 把打包生成的入口文件，放入到 js/entry/ 目录下
                entryFileNames: 'js/entry/[name]-[hash].js',
                // 把打包生成的 chunk (懒加载)文件，放入到 js/chunk/ 目录下
                chunkFileNames: 'js/chunk/[name]-[hash].js'

            }
        }

    },
    esbuild: {
        drop: ['console', 'debugger']
    }

}

export default prodConfig



