/// <reference types="vite/client" />



//--------------用户基本信息--------------
type User = {
    readonly id: number,
    username: string,
    nickname?: string,
    email?: string,
    user_pic?: string
}


// ------------请求体数据类型------------
type RegForm = {
    username: string
    password: string
    repassword: string
}
type LoginForm = Omit<RegForm, 'repassword'>


//------------接口返回数据类型-------------

//基础类型
interface BaseResponse<T = unknown> {
    // data: {
    code: number
    message: string
    data?: T
    // }

}

//登录之后类型
interface LoginResponse extends BaseResponse {
    // data: BaseResponse[data] & {
    token: string
    // }

}









