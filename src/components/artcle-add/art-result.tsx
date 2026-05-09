import type { FC } from 'react'
import { Result, Button } from 'antd'
import { useActionData, useNavigate } from 'react-router-dom'
import { resetCurrent } from '@/store/art-add-store'

const ArticleResult: FC = () => {
    const actionData = useActionData() as { msg: string } | null
    const navigate = useNavigate()


    const gotoList = () => {
        //触发导航
        navigate('/art-list')
        //重置current
        resetCurrent()
    }



    return (
        <Result
            status="success"
            title={actionData ? actionData.msg : '文章发表成功!!!'}
            subTitle=""
            extra={[
                <Button type="primary" key="list" onClick={gotoList}>
                    去文章列表
                </Button>,
                <Button key="rewrite" onClick={() => resetCurrent()}>再写一篇</Button>
            ]}
        />
    )
}

export default ArticleResult