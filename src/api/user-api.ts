import axios from "@/api";

export const getUserApi = () => axios.get<null, BaseResponse<User>>('/my/userinfo')