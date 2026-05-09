import { createBrowserRouter } from 'react-router-dom'
import Authlayout from '@/views/auth/auth-laout.tsx'
import AuthRoot from '@/views/root/auth-root'
import RouterErrorElement from '@/components/common/router-error-element'
import PageNotFound from '@/components/common/404'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createBrowserRouter([
    {
        path: '/reg',
        errorElement: <RouterErrorElement />,
        async lazy() {
            const { default: Reg, action } = await import('@/views/auth/reg.tsx')
            return {
                element: <Authlayout>
                    <Reg />
                </Authlayout>,
                action
            }
        }

    },
    {
        path: '/login',
        errorElement: <RouterErrorElement />,
        async lazy() {
            const { default: Login, action } = await import('@/views/auth/loginn.tsx')
            return {
                element: <Authlayout>
                    <Login />
                </Authlayout>,
                action
            }
        }
    },
    {
        path: '/',
        errorElement: <RouterErrorElement />,
        async lazy() {
            const { default: Root, loader } = await import('@/views/root/root.tsx')
            return {
                element: <AuthRoot>
                    <Root />
                </AuthRoot>,
                loader
            }
        },

        children: [
            {
                errorElement: <RouterErrorElement />,
                children: [
                    {
                        index: true,
                        async lazy() {
                            const { default: Home } = await import('@/views/home/home.tsx')
                            return {
                                Component: Home
                            }
                        }
                    },
                    {
                        path: 'home',
                        async lazy() {
                            const { default: Home } = await import('@/views/home/home.tsx')
                            return {
                                Component: Home
                            }
                        }
                    },
                    {
                        path: 'user-info',
                        async lazy() {
                            const { default: UserInfo, action } = await import('@/views/user/user-info.tsx')
                            return {
                                Component: UserInfo,
                                action
                            }
                        }
                    },
                    {
                        path: 'user-avatar',
                        async lazy() {
                            const { default: UserAvatar, action } = await import('@/views/user/user-avatar')
                            return {
                                Component: UserAvatar,
                                action
                            }
                        }
                    },
                    {
                        path: 'user-pwd',
                        async lazy() {
                            const { default: UserPassword, action } = await import('@/views/user/user-password')
                            return {
                                Component: UserPassword,
                                action
                            }
                        }
                    },
                    {
                        path: 'art-cate',
                        async lazy() {
                            const { default: ArticleCate, loader, action } = await import('@/views/article/article-cate')
                            return {
                                Component: ArticleCate,
                                action,
                                loader
                            }
                        }
                    },
                    {
                        path: 'art-list',
                        async lazy() {
                            const { default: ArticleList, loader, action } = await import('@/views/article/article-list')
                            return {
                                Component: ArticleList,
                                action,
                                loader
                            }
                        }
                    },
                    {
                        path: 'art-add',
                        shouldRevalidate: () => {
                            return false
                        },
                        async lazy() {
                            const { default: ArticleAdd, loader, action } = await import('@/views/article/article-add')
                            return {
                                Component: ArticleAdd,
                                action,
                                loader
                            }
                        }
                    },
                    {
                        path: 'art-edit/:id',
                        shouldRevalidate: () => {
                            return false
                        },
                        async lazy() {
                            const { default: ArticleEdit, loader, action } = await import('@/views/article/article-edit')
                            return {
                                Component: ArticleEdit,
                                action,
                                loader
                            }
                        }
                    },
                    {
                        path: '*', element: <PageNotFound />
                    }
                ]
            }
        ]
    },

])

router.subscribe((state) => {
    if (state.navigation.location) {
        //正在请求资源
        //展示顶部进度条提示用户当前状态
        NProgress.start()

    } else {
        //没有请求页面资源
        //隐藏进度条
        NProgress.done()
    }
})

export default router


