import { resetCurrent } from "@/store/art-edit-store"
import { Button, Result } from "antd"
import { FC, useCallback } from "react"
import { useActionData, useLocation, useNavigate } from "react-router-dom"
import CountDown from "../common/count-down"


const EditResult: FC = () => {
    const actionData = useActionData() as { msg: string } | null
    const navigate = useNavigate()
    const location = useLocation()
    const searchparams = location.state ? location.state : ''

    const gotoList = useCallback(() => {
        //触发导航
        navigate('/art-list' + searchparams)
    }, [navigate])



    return (
        <Result
            status="success"
            title={actionData ? actionData.msg : '文章发表成功!!!'}
            // subTitle="5s后自动跳转到文章列表"
            subTitle={<CountDown value={10} suffx="秒后自动跳转到文章列表" onFinish={gotoList} />}
            extra={[
                <Button type="primary" key="list" onClick={useCallback(() => gotoList(), [gotoList])}>
                    去文章列表
                </Button>

            ]}
        />
    )
}

export default EditResult