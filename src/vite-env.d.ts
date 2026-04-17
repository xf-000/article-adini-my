/// <reference types="vite/client" />



// ------------请求体数据类型------------
type RegForm = {
    username: string
    password: string
    repassword: string
}


//------------接口返回数据类型-------------

//基础类型
interface BaseResponse {
    code: number
    message: string
}

//登录之后类型
interface LoginResponse extends BaseResponse {
    token: string
}

//用户基本信息
type User = {
    readonly id: number,
    username: string,
    nickname?: string,
    email?: string,
    user_pic?: string
}







type LoginForm = Omit<RegForm, 'repassword'>