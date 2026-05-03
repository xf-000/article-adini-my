import axios from "@/api";



export const postArticleApi = (data: FormData) => axios.post<null, BaseResponse>('/my/article/add', data)