import type { FC } from 'react'
import { Button, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import { resetAllStore, broadcastLogout } from '@/store/resetters'

const Logout: FC = () => {

    const navigate = useNavigate()

    const confirm = () => {
        resetAllStore()
        broadcastLogout()
        navigate('/login')

    }

    return (
        <Popconfirm
            title="退出登录"
            description="您确认退出登录吗?"
            onConfirm={confirm}
            okText="确认"
            cancelText="取消">
            <Button type="link">Logout</Button>
        </Popconfirm>
    )
}

export default Logout