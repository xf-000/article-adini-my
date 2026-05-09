import { createBrowserRouter } from 'react-router-dom'
import Reg, { action, action as regAction } from '@/views/auth/reg.tsx'
import Login, { action as loginAction } from '@/views/auth/loginn.tsx'
import Root, { loader as rootLoader } from '@/views/root/root.tsx'
import Authlayout from '@/views/auth/auth-laout.tsx'
import AuthRoot from '@/views/root/auth-root'
import Home from '@/views/home/home.tsx'
import UserAvatar, { action as userAvatarAction } from '@/views/user/user-avatar'
import UserInfo, { action as userInfoAction } from '@/views/user/user-info.tsx'
import UserPassword, { action as userPwdAction } from '@/views/user/user-password'
import ArticleAdd, { loader as artAddLoader, action as artAddAction } from '@/views/article/article-add'
import ArticleCate, { loader as artCateLoader, action as artCateAction } from '@/views/article/article-cate'
import ArticleEdit, { loader as artEditLoader, action as artEditAction } from '@/views/article/article-edit'
import ArticleList, { loader as artListLoader, action as artListAction } from '@/views/article/article-list'




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
            {
                path: 'user-info',
                element: <UserInfo />,
                action: userInfoAction
            },
            {
                path: 'user-avatar',
                element: <UserAvatar />,
                action: userAvatarAction
            },
            {
                path: 'user-pwd',
                element: <UserPassword />,
                action: userPwdAction
            },
            {
                path: 'art-cate',
                element: <ArticleCate />,
                loader: artCateLoader,
                action: artCateAction
            },
            {
                path: 'art-list',
                element: <ArticleList />,
                loader: artListLoader,
                action: artListAction
            },
            {
                path: 'art-add',
                element: <ArticleAdd />,
                loader: artAddLoader,
                action: artAddAction,
                shouldRevalidate: () => {
                    return false
                }
            },
            {
                path: 'art-edit/:id',
                element: <ArticleEdit />,
                loader: artEditLoader,
                action: artEditAction,
                shouldRevalidate: () => {
                    return false
                }
            },
        ]

    },

])

export default router


