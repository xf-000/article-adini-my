import axios from "@/api";


//获取分类列表的接口
export const getCateListApi = () => axios.get<null, BaseResponse<CateItem[]>>('/my/cate/list')

//添加分类的接口
export const postCateApi = (data: FormData) => axios.post<null, BaseResponse>('/my/cate/add', data)

//修改分类的接口
export const editCateApi = (data: FormData) => axios.put<null, BaseResponse>('/my/cate/info', data)

//删除分类的接口
export const delCateApi = (data: FormData) => axios.delete<null, BaseResponse>('/my/cate/del', { params: data })







