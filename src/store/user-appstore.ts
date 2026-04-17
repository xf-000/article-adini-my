import { create } from 'zustand'
import resetters from './resetter'

const initState = {
    user: {} as User
}
type UserStoreTtpe = typeof initState

const useUserStore = create<UserStoreTtpe>((set) => {
    //重置store的resetter的回调函数
    resetters.push(() => set(initState))
    //store里的数据
    return { ...initState }
})


export default useUserStore