import { Move } from "@/store/art-add-store"
import useArticleEditStore, { selectCover, setArticleCover, updateCurrent } from "@/store/art-edit-store"
import { Avatar, Button, message, Space } from "antd"
import { FC, useRef } from "react"


const EditCover: FC = () => {
    const iptRef = useRef<HTMLInputElement>(null)

    const coverUrl = useArticleEditStore(selectCover)



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files

        if (!files || files.length === 0)
            return

        if (files[0].size > 1024 * 1024 * 2)
            return message.error('封面图片大小不可超过2M')

        setArticleCover(files[0])
    }


    return <>
        <Space direction="vertical">
            {
                coverUrl ? (
                    <Avatar
                        size={300}
                        shape='square'
                        src={coverUrl}
                    />) : (
                    <Avatar
                        size={300}
                        shape='square'
                        onClick={() => {
                            iptRef.current?.click()
                        }}
                    >请选择文章封面
                    </Avatar>
                )
            }



            <Space direction="horizontal">
                <Button
                    type="primary"
                    onClick={() => updateCurrent(Move.pre)}
                >上一步
                </Button>

                <Button
                    type="primary"
                    onClick={() => {
                        iptRef.current?.click()
                    }}
                >选择封面
                </Button>

                <Button
                    type="primary"
                    onClick={() => updateCurrent(Move.next)}
                    disabled={!coverUrl}
                >下一步
                </Button>

                {/* 文件选择器 */}
                <input type="file" accept="image/*" style={{ display: 'none' }} ref={iptRef} onChange={handleFileChange} />
            </Space>

        </Space >
    </>
}

export default EditCover

