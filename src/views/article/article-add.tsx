import { postArticleApi } from "@/api/article-api";
import { getCateListApi } from "@/api/cate-api";
import ArticleBase from "@/components/artcle-add/art-base";
import ArticleContent from "@/components/artcle-add/art-content";
import ArticleCover from "@/components/artcle-add/art-cover";
import ArticleResult from "@/components/artcle-add/art-result";
import useArtAddStore, { ArtAddStore, ArticleSteps, clearArticle, resetCurrent, setCurrent } from "@/store/art-add-store";
import localforage from "@/utils/localforage";
import { FloatButton, message, Modal, Steps } from "antd";
import to from "await-to-js";
import { FC, useEffect, useRef, } from "react";
import { StorageValue } from "zustand/middleware";
import { ClearOutlined } from '@ant-design/icons'
import { defer } from "react-router-dom";



export const stepItems = [
    {
        title: '基本信息'
    },
    {
        title: '文章封面'
    },
    {
        title: '文章内容'
    },
    {
        title: 'Done'
    }
]

const ArticleAdd: FC = () => {
    const current = useArtAddStore((state) => state.current)
    const _hasHydrated = useArtAddStore((state) => state._hasHydrated)
    const modalRef = useRef<() => void>()

    useEffect(() => {
        return () => modalRef.current && modalRef.current()
    }, [])

    const HandleClean = () => {
        //弹出确认清空的弹框
        modalRef.current = Modal.confirm({
            title: '操作提示',
            content: '此操作会清空表单中填写的所有数据，确认清空吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                //清空current
                resetCurrent()
                //清空文章数据
                clearArticle()

                message.success('表单清空完毕')
            }
        }).destroy

    }

    return (
        _hasHydrated && <div>
            {/* 步骤条 */}
            <Steps size="small" current={current} items={stepItems} />


            <div style={{ marginTop: 20 }}>
                {current === ArticleSteps.base && <ArticleBase />}
                {current === ArticleSteps.cover && <ArticleCover />}
                {current === ArticleSteps.content && <ArticleContent />}
                {current === ArticleSteps.done && <ArticleResult />}
            </div>

            {/* 浮动按钮 */}
            <FloatButton
                type="primary"
                icon={<ClearOutlined />}
                tooltip="清空表单"
                onClick={HandleClean} />

        </div >)
}

export default ArticleAdd

//loader
export const loader = async () => {
    //获取current的值，若为done状态，则将其重置为base状态
    //
    const localStore = await localforage.getItem<StorageValue<ArtAddStore>>('art-add-store')
    const current = localStore?.state.current
    if (current === ArticleSteps.done) {
        resetCurrent()
    }



    const result = getCateListApi()

    return defer({ result })
}

//action
export const action = async () => {
    const article = useArtAddStore.getState().article
    //将对象格式请求体转为FormData格式请求
    const fd = new FormData()
    for (const key in article) {
        fd.append(key, article[key])
    }


    const [err] = await to(postArticleApi(fd))
    if (err) return null
    // 添加文章成功
    const msg = article.state === '草稿' ? '草稿保存成功！' : '文章发表成功！'
    //进度条自增
    setCurrent()
    message.success(article.state === '草稿' ? '草稿保存成功！' : '文章发表成功！')
    //清空文章信息的store
    clearArticle()

    return { msg: msg }
}