import ReactDOM from 'react-dom/client'
// App 根组件
import { RouterProvider } from 'react-router-dom'
import router from '@/router/index.tsx'
// 全局样式表
import '@/index.less'

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
