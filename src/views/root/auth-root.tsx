import router from '@/router'
import useAppStore from '@/store/app-store'
import { FC, PropsWithChildren, useEffect } from 'react'
import { matchRoutes, Navigate, useLocation, } from 'react-router-dom'
import { listenLogout } from '@/store/resetters'



const AuthRoot: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()
    const tooken = useAppStore((store) => store.token)

    useEffect(() => {
        listenLogout(() => {
            window.location.href = '/login'
        })
    }, [])

    //已登录,有tooken
    if (tooken) {
        return <>{children}</>
    }
    //无登录，无tooken
    else {
        const nextUrl = location.pathname + location.search
        const matchResult = matchRoutes(router.routes, nextUrl)

        if (matchResult && matchResult.length !== 0 && matchResult[matchResult.length - 1].route.path === '*') {
            return <Navigate to={'/login?form='} replace />
        } else {
            return <Navigate to={'/login?form=' + nextUrl} replace />
        }


    }



}

export default AuthRoot