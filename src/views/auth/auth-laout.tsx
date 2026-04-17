import type { FC, PropsWithChildren } from 'react'
import styles from '@/views/auth/auth-layout.module.less'
import useAppStore from '@/store/app-store'
import { Navigate } from 'react-router-dom'

const Authlayout: FC<PropsWithChildren> = ({ children }) => {
    const token = useAppStore((store) => store.token)
    if (token) {
        return <Navigate to='/' replace />
    }

    return <div className={styles.container}>
        <div className={styles.boxTest}>{children}</div>
    </div>
}

export default Authlayout

