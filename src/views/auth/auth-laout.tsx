import type { FC, PropsWithChildren } from 'react'
import styles from '@/views/auth/auth-layout.module.less'

const Authlayout:
    FC<PropsWithChildren> = ({ children }) => {

        return <div className={styles.container}>
            <div className={styles.box}>{children}</div>
        </div>
    }

export default Authlayout