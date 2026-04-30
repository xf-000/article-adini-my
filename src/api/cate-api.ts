import axios from "@/api";


//分类列表
export const getCateListApi = () => axios.get<null, BaseResponse<CateItem[]>>('/my/cate/list')









