import type { FC, PropsWithChildren } from 'react'
import styles from '@/views/auth/auth-layout.module.less'
import useAppStore from '@/store/app-store'
import { Navigate, useLocation } from 'react-router-dom'

const Authlayout: FC<PropsWithChildren> = ({ children }) => {
    const token = useAppStore((store) => store.token)
    const location = useLocation()

    //有tooken的情况
    if (token) {
        let nextUrl = ''
        //took失效，重新登录后应该跳转到的页面
        if (location.search.includes('?from=')) {
            const serach = location.search.replace('?from=', '')
            nextUrl = serach ? serach : ''
        }
        //注册成功后跳转到登录页面
        else {
            nextUrl = '/'
        }

        return <Navigate to={nextUrl} replace />

    }

    //无tooken的情况
    return <div className={styles.container}>
        <div className={styles.boxTest}>{children}</div>
    </div>
}

export default Authlayout

