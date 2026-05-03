import { useNavLoading, useNavSubmitting } from "@/utils/hooks"
import { Button, message, Popconfirm, PopconfirmProps } from "antd"
import { FC, useEffect, useState } from "react"
import { useActionData, useSubmit } from "react-router-dom"


const ButtonDelete: FC<{ id: number }> = ({ id }) => {
    const [open, setOpen] = useState(false)
    const submit = useSubmit()
    const submitting = useNavSubmitting('DELETE')
    const loading = useNavLoading('DELETE')
    const actionData = useActionData()

    const handleDelete = () => {
        if (id === 1 || id === 2) {
            return message.error('此分类禁止删除')
        }
        setOpen(true)
    }

    const cancel = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (loading && actionData)
            setOpen(false)
    }, [loading, actionData])

    //手动关闭气泡确认框
    const handleOpenChange: PopconfirmProps['onOpenChange'] = (isopen, e) => {
        const btnType = e?.currentTarget.dataset.type
        if (!isopen && btnType !== 'btn-ok')
            setOpen(false)
    }

    const confirm = () => {
        submit({ id: id }, { method: 'DELETE' })

    }


    return <>
        <Popconfirm
            title="操作提示"
            description="您确定删除此文章分类吗?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确认"
            okButtonProps={{ 'data-type': 'btn-ok', loading: submitting && { delay: 200 } }}
            open={open}
            onOpenChange={handleOpenChange}
            cancelText="取消">
            <Button
                type='link'
                size="small"
                onClick={handleDelete}>
                删除
            </Button>
        </Popconfirm>
    </>
}

export default ButtonDelete