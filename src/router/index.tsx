import { createBrowserRouter } from 'react-router-dom'
import Reg, { action as regAction } from '@/views/auth/reg.tsx'
import Login, { action as loginAction } from '@/views/auth/loginn.tsx'
import Root from '@/views/root/root.tsx'
import Authlayout from '@/views/auth/auth-laout.tsx'
import AuthRoot from '@/views/root/auth-root'

const router = createBrowserRouter([
    {
        path: '/reg',
        element:
            <Authlayout>
                <Reg />
            </Authlayout>,
        action: regAction

    },
    {
        path: '/login',
        element: <Authlayout>
            <Login />
        </Authlayout>,
        action: loginAction
    },
    {
        path: '/', element:
            <AuthRoot>
                <Root />
            </AuthRoot>

    },

])

export default router
