import { PersistStorage } from "zustand/middleware"
import localforage from "./localforage"


export const createStorage = <T = unknown>() => {
    //自定义zustand的存储引擎
    const storage: PersistStorage<T> = {
        getItem(name) {
            return localforage.getItem(name)
        },
        setItem(name, value) {
            localforage.setItem(name, value)
        },
        removeItem(name) {
            localforage.removeItem(name)
        }
    }
    return storage
}

