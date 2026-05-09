import { useNavLoading, useNavSubmitting } from "@/utils/hooks"
import { Button, message, Popconfirm, PopconfirmProps } from "antd"
import { FC, useEffect, useState } from "react"
import { useActionData, useAsyncValue, useLoaderData, useLocation, useSubmit } from "react-router-dom"


const BtnDeleteArticle: FC<{ id: number }> = ({ id }) => {
    //控制气泡展示状态
    const [open, setOpen] = useState(false)

    const location = useLocation()
    const submit = useSubmit()
    const submitting = useNavSubmitting('DELETE', location.pathname + location.search)
    const actionData = useActionData()
    const loading = useNavLoading('DELETE', location.pathname + location.search)
    const loaderData = useLoaderData() as { q: ArtListQuery }
    const [, artListResult] = useAsyncValue() as [BaseResponse<CateItem[]>, ArticleListResponse]

    const confirm = () => {
        //判断页码值是否需要进行回退操作
        //1.当前页只剩一条数据
        //2.当前页是最后一页
        //3.当前页不是第一页
        let needBack = false
        if (loaderData) {
            const { q } = loaderData
            const list = artListResult.data || []
            const total = artListResult.total
            needBack = list.length === 1 && q.pagenum === Math.ceil(total / q.pagesize) && q.pagenum !== 1
        }

        submit({ id: id, needBack }, { method: 'DELETE' })

    }

    const cancel = () => {
        message.success('取消删除')

    }

    useEffect(() => {
        if (loading && actionData)
            setOpen(false)

    }, [loading, actionData])

    const handelOpenChange: PopconfirmProps['onOpenChange'] = (isOpen, e) => {
        const btnType = e?.currentTarget.dataset.type


        if (!isOpen && btnType !== 'btn-ok') {
            setOpen(false)
        }
    }

    return (
        <Popconfirm
            title="操作提示"
            description="您确认删除此文章吗？"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确认"
            open={open}
            okButtonProps={{
                'data-type': 'btn-ok',
                loading: submitting && { delay: 200 }
            }}
            onOpenChange={handelOpenChange}
            cancelText="取消">

            <Button
                type="link"
                size="small"
                onClick={() => setOpen(true)}
            >删除
            </Button>
        </Popconfirm>
    )
}

export default BtnDeleteArticle
