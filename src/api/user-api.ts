import axios from "@/api";

//获取基本信息接口
export const getUserApi = () => axios.get<null, BaseResponse<User>>('/my/userinfo')

//获取左侧菜单信息接口
export const getMenuApi = () => axios.get<null, BaseResponse<MenuItem[]>>('/my/menus')

//更新用户基本资料
export const updateUserInfoApi = (data: FormData) => axios.put<null, BaseResponse>('/my/userinfo', data)