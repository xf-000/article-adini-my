//生成一个延时的异步操作，第一个参数：成功率，第二个参数：延时毫秒数
export const delay = (successRate: number = 50, ms: number = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.random() * 100
            //成功了
            if (num < successRate) { resolve(true) }
            //失败了
            else { reject(new Error('Promise调用失败了!!')) }
        }, ms)
    })
}

