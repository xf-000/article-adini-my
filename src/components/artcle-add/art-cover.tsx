import useArtAddStore, { Move, setCurrent, setArticleCover, selectCover } from "@/store/art-add-store"
import { Avatar, Button, Space } from "antd"
import { FC, useRef } from "react"


const ArticleCover: FC = () => {
    const iptRef = useRef<HTMLInputElement>(null)
    const coverUrl = useArtAddStore(selectCover)



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files

        if (!files || files.length === 0)
            return
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
                    onClick={() => setCurrent(Move.pre)}
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
                    onClick={() => setCurrent(Move.next)}
                    disabled={!coverUrl}
                >下一步
                </Button>

                {/* 文件选择器 */}
                <input type="file" accept="image/*" style={{ display: 'none' }} ref={iptRef} onChange={handleFileChange} />
            </Space>

        </Space >
    </>
}

export default ArticleCover

