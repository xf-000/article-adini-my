/// <reference types="vite/client" />



//--------------用户基本信息--------------
type User = {
    readonly id: number,
    username: string,
    nickname?: string,
    email?: string,
    user_pic?: string
}

//添加文章current=base 的Form类型
type ArticleAddBaseForm = Partial<Pick<ArticleAddForm, 'title' | 'cate_id'>>

////修改文章current=base 的Form类型
type ArticleEditBaseForm = ArticleAddBaseForm


// ------------请求体数据类型------------
type RegForm = {
    username: string
    password: string
    repassword: string
}
type LoginForm = Omit<RegForm, 'repassword'>

//重置密码
type ResetPwdForm = {
    old_pwd: string
    new_pwd: string
    re_pwd: string
}

//添加文章分类
type ArtCateAddForm = Omit<CateItem, 'id'>

//添加文章||文章基本信息
type ArticleAddForm = {
    title: string
    cate_id: string
    content: string
    state: '草稿' | '已发布'
    cover_img: Blob
    [x: string]: string | Blob
}

//文章的列表数据
type ArtListQuery = {
    pagenum: number,
    pagesize: number,
    cate_id: number | string,
    state: string

}


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

//左侧菜单ts类型
type MenuItem = {
    readonly key: string,
    title?: string,
    label: string,
    icon: React.ReactNode,
    children?: MenuItem[]
}

//修改用户数据
type UserInfoForm = Pick<User, 'id' | 'email' | 'nickname'>

//文章分类item项类型
type CateItem = {
    readonly id: number,
    cate_name: string,
    cate_alias: string
}

//文章的类型
type Article = {
    readonly "id": number
    "title": string
    "pub_date": string,
    "state": "草稿" | '已发布',
    "cate_name": string
}

//文章列表接口返回的数据类型
interface ArticleListResponse extends BaseResponse<Article[]> {
    total: number
}

//根据id获取文章的接口返回数据 ||  文章详情的数据
type ArticleEditForm = ArticleAddForm & { readonly id: string }







