import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import resetters from "./resetters";


//-----------初始数据------------
const initState = {
    token: '',
    collapsed: false
}

type AppStoreType = typeof initState


const useAppStore = create<AppStoreType>()(
    immer(
        devtools(
            persist(
                (set) => {
                    //重置store
                    resetters.push(() => set(initState))
                    //store中的数据
                    return { ...initState }
                },
                { name: 'app-store' }//数据持久化配置
            ),
            { name: 'app-store' }//调试工具的配置
        )
    )
)



export default useAppStore

//--------------修改store数据的函数-------------

//为token赋值的函数
export const setToken = (token: string) => {
    useAppStore.setState((state) => {
        state.token = token
    })
}

//修改状态栏折叠状态的函数
export const setCollapsed = (collapsed: boolean) => {
    useAppStore.setState((state) => {
        state.collapsed = collapsed
    })
}
