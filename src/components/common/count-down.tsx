//计时器


import { FC, useEffect, useRef, useState } from "react"

type CountDown = {
    value: number,
    prefix?: string,    //前缀
    suffx?: string,    //后缀
    onFinish?: () => void
}

const CountDown: FC<CountDown> = ({ value, prefix, suffx, onFinish }) => {
    //由于父传子的props不可更改，调用usestate保存其值
    const [count, setCount] = useState(value)
    const timerRef = useRef<number>()


    //首次渲染时，创建定时器
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCount((pre) => pre - 1)
        }, 1000)

        // 清理函数，在组件销毁时清除定时器
        return () => clearInterval(timerRef.current)
    }, [])

    //count为0时清除定时器
    useEffect(() => {
        if (count === 0) {
            clearInterval(timerRef.current)
            onFinish && onFinish()
        }
    }, [count, onFinish])

    return (
        <>
            {prefix}
            {count}
            {suffx}

        </>
    )
}
export default CountDown