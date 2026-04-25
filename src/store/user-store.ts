import { create } from 'zustand'
import resetters from './resetter'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { getUserApi } from '@/api/user-api'
import to from 'await-to-js'

const initState = {
    user: {} as User
}
type UserStoreType = typeof initState

const useUserStore = create<UserStoreType>()(
    immer(
        devtools(
            persist(
                (set) => {
                    //重置store的resetter的回调函数
                    resetters.push(() => set(initState))
                    //store里的数据
                    return { ...initState }
                },
                { name: 'user-store1' }//数据持久化配置
            ),
            { name: 'user-store2' }//调试工具的配置
        )
    )
)


export default useUserStore

//action
//初始化用户基本信息
export const initUser = async () => {
    const [err, res] = await to(getUserApi())
    if (err)
        return null

    useUserStore.setState((state) => {
        if (res.data)
            state.user = res.data
    })

}

//--------------selector--------------
//名称
export const selectName = (state: UserStoreType) => state.user.nickname || state.user.username
//头像
export const selectAvatar = (state: UserStoreType) => state.user.user_pic