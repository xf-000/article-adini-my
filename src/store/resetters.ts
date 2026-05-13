const resetters: (() => void)[] = []

export default resetters

export const resetAllStore = () => resetters.forEach((fn) => fn())

// 多标签页同步退出登录
const channel = new BroadcastChannel('auth-channel')

export const broadcastLogout = () => {
    channel.postMessage('logout')
}

export const listenLogout = (callback: () => void) => {
    channel.onmessage = (e) => {
        if (e.data === 'logout') {
            callback()
        }
    }
}