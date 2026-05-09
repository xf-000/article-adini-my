import { upAvatarApi } from "@/api/user-api";
import useUserStore, { selectAvatar } from "@/store/user-store";
import { useNavSubmitting } from "@/utils/hooks";
import { Avatar, Button, message, Space } from "antd";
import to from "await-to-js";
import { FC, useMemo, useRef, useState } from "react";
import { ActionFunctionArgs, useSubmit } from "react-router-dom";


const UserAvatar: FC = () => {
    const avatar = useUserStore(selectAvatar)
    const iptRef = useRef<HTMLInputElement>(null)
    const [newAvatar, setNewAvatar] = useState('')
    const submit = useSubmit()
    const submitting = useNavSubmitting('PATCH')

    //管理保存按钮状态
    const isDisable = useMemo(() =>
        !newAvatar || newAvatar === avatar //选择的新头像和原来的头像不一样，返回false

        , [newAvatar])


    const showDialog = () => {
        iptRef.current?.click()
    }

    //封面变化时触发
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files

        if (!files || files.length === 0) return

        //创建文件读取器，并把文件变为base64的字符串
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = () => {
            if (fr.result)
                setNewAvatar(fr.result as string)
        }
    }

    //提交数据至action
    const saveAvatar = () => {
        if (submitting) return
        submit({ avatar: newAvatar }, { method: 'PATCH' })
    }

    return <Space direction="vertical">
        {newAvatar || avatar ?
            //数据库有头像直接渲染头像，若修改了图像则用修改的头像
            (<Avatar size={300} shape="square" src={newAvatar || avatar} />) :
            //数据库无头像
            (<Avatar size={300} shape="square" onClick={showDialog}>请选择头像</Avatar>)}


        <Space>
            <Button onClick={showDialog}>选择照片</Button>

            <Button
                type="primary"
                disabled={isDisable}
                loading={submitting && { delay: 200 }}
                onClick={saveAvatar}
            >保存头像
            </Button>

            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={iptRef}
                onChange={onFileChange} />
        </Space>
    </Space>
}

export default UserAvatar

export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()

    const [err] = await to(upAvatarApi(fd))

    if (err) return null
    message.success('头像更新成功')

    return null
}