import { createBrowserRouter } from 'react-router-dom'
import Reg, { action as regAction } from '@/views/auth/reg.tsx'
import Login, { action as loginAction } from '@/views/auth/loginn.tsx'
import Root, { loader as rootLoader } from '@/views/root/root.tsx'
import Authlayout from '@/views/auth/auth-laout.tsx'
import AuthRoot from '@/views/root/auth-root'
import Home from '@/views/home/home.tsx'
import UserAvatar from '@/views/user/user-avatar'
import UserInfo, { action as userInfoAction } from '@/views/user/user-info.tsx'
import UserPassword from '@/views/user/user-password'
import ArticleAdd from '@/views/article/article-add'
import ArticleCate from '@/views/article/article-cate'
import ArticleEdit from '@/views/article/article-edit'
import ArticleList from '@/views/article/article-list'




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
        path: '/',
        element:
            <AuthRoot>
                <Root />
            </AuthRoot>,
        loader: rootLoader,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Home /> },
            { path: 'user-info', element: <UserInfo />, action: userInfoAction },
            { path: 'user-avatar', element: <UserAvatar /> },
            { path: 'user-pwd', element: <UserPassword /> },
            { path: 'art-cate', element: <ArticleCate /> },
            { path: 'art-list', element: <ArticleList /> },
            { path: 'art-add', element: <ArticleAdd /> },
            { path: 'art-edit/:id', element: <ArticleEdit /> },
        ]

    },

])

export default router


