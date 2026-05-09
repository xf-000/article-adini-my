import { Move } from "@/store/art-add-store"
import useArticleEditStore, { setArticleState, setContent, updateCurrent } from "@/store/art-edit-store"
import { useNavSubmitting } from "@/utils/hooks"
import { Button, message, Space, Spin } from "antd"
import { FC, useRef } from "react"
import ReactQuill from "react-quill"
import { useSubmit } from "react-router-dom"
import { modules } from "../artcle-add/art-content"
import styles from '@/components/artcle-add/css/art-content.module.less'



const EditContent: FC = () => {
    // 选取全局的文章内容
    const value = useArticleEditStore((state) => state.article.content)
    const submit = useSubmit()
    const submitting = useNavSubmitting('POST')
    const isShowDarft = useRef(useArticleEditStore((state) => state.article.state))

    // 按钮的点击事件处理函数
    const publish = (state: '草稿' | '已发布') => {
        if (!value) return message.error('请填写文章的内容！')
        setArticleState(state)
        //不改变url的提交，类似fetcher
        submit(null, { method: 'PUT', navigate: false })
    }

    return (
        <div className={styles.artContent}>
            <Spin spinning={submitting} delay={200}>
                <Space direction="vertical" style={{ display: 'flex' }}>
                    <ReactQuill theme="snow" value={value} onChange={setContent} modules={modules} />

                    {/* 按钮区域 */}
                    <Space direction="horizontal">
                        <Button type="primary" onClick={() => updateCurrent(Move.pre)}>
                            上一步
                        </Button>

                        {/* 判断是否需要该‘存为草稿’按钮 */}
                        {isShowDarft.current === '草稿' && <Button type="primary" onClick={() => publish('草稿')}>
                            存为草稿
                        </Button>}

                        <Button type="primary" onClick={() => publish('已发布')}>
                            发布
                        </Button>

                    </Space>
                </Space>
            </Spin>
        </div>
    )
}

export default EditContent