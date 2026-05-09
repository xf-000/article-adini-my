import ReactDOM from 'react-dom/client'
// App 根组件
import { matchPath, RouterProvider } from 'react-router-dom'
import router from '@/router/index.tsx'
// 全局样式表
import '@/index.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'


matchPath('/art-edit/:id', '/art-erit/123')
//第一个参数：pattern模式，可以是路由的path地址.如/art-edit/:id
//第二个参数：实际URL地址中的路径例.如/art-erit/123

ReactDOM.createRoot(document.getElementById('root')!).render(<ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
</ConfigProvider>)
