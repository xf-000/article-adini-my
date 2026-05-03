import { Method } from "axios"
import { useLocation, useNavigation } from "react-router-dom"




//获取导航期间，loading（数据回显）的状态
export const useNavLoading = (method: Method, pathname?: string) => {
    const navigation = useNavigation()
    const location = useLocation()

    const loading = navigation.state === 'loading' && navigation.formMethod?.toUpperCase() === method && navigation.formAction === (pathname || location.pathname)

    return loading
}

//获取导航期间，submiting（请求进行中）的状态
export const useNavSubmitting = (method: Method, pathname?: string) => {
    const navigation = useNavigation()
    const location = useLocation()

    const submitting = navigation.state === 'submitting' && navigation.formMethod.toUpperCase() === method && navigation.formAction === (pathname || location.pathname)

    return submitting
}
