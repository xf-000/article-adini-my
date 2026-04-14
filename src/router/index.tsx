import { createBrowserRouter } from 'react-router-dom'
import Reg from '@/views/auth/reg.tsx'
import Login from '@/views/auth/loginn.tsx'
import Root from '@/views/root/root.tsx'
import Authlayout from '@/views/auth/auth-laout.tsx'

const router = createBrowserRouter([
    {
        path: '/reg', element: <Authlayout>
            <Reg />
        </Authlayout>
    },
    {
        path: '/login', element: <Authlayout>
            <Login />
        </Authlayout>
    },
    {
        path: '/', element: <Authlayout>
            <Root />
        </Authlayout>
    },

])

export default router
