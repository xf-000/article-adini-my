// 项目开发阶段对应的打包配置项
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { createHtmlPlugin } from 'vite-plugin-html'

const devConfig: UserConfig = {
    plugins: [
        react(),
        createHtmlPlugin({
            // 是否针对 html 标签进行代码压缩
            minify: false,
            // 打包的入口
            entry: 'src/main.tsx',
            //是否适配vite5.0以后的版本
            viteNext: true,
            // 向网页中注入数据
            inject: {
                //真正要注入到网页中的数据
                data: {
                    title: 'dev-文章后台管理系统dev',
                    injectScript: '' // 开发阶段不需要向网页中注入任何 script 标签
                }
            }
        })
    ],
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
    }
}

export default devConfig