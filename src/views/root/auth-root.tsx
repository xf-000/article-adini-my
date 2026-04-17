import useAppStore from '@/store/app-store'
import { FC, PropsWithChildren } from 'react'
import { Navigate, } from 'react-router-dom'




const AuthRoot: FC<PropsWithChildren> = ({ children }) => {

    const tooken = useAppStore((store) => store.token)
    //已登录
    if (tooken)
        return <>{children}</>
    //无登录
    else
        return <Navigate to='/login' replace />


}

export default AuthRoot