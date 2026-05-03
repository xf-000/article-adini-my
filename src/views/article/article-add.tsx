import { postArticleApi } from "@/api/article-api";
import { getCateListApi } from "@/api/cate-api";
import ArticleBase from "@/components/artcle-add/art-base";
import ArticleContent from "@/components/artcle-add/art-content";
import ArticleCover from "@/components/artcle-add/art-cover";
import useArtAddStore, { ArticleSteps } from "@/store/art-add-store";
import { message, Steps } from "antd";
import to from "await-to-js";
import { FC, } from "react";



const stepItems = [
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

    return (
        _hasHydrated && <div>
            {/* 步骤条 */}
            <Steps size="small" current={current} items={stepItems} />


            <div style={{ marginTop: 20 }}>
                {current === ArticleSteps.base && <ArticleBase />}
                {current === ArticleSteps.cover && <ArticleCover />}
                {current === ArticleSteps.content && <ArticleContent />}
                {current === ArticleSteps.done && <ArticleCover />}
            </div>

        </div >)
}

export default ArticleAdd


export const loader = async () => {
    const [err, res] = await to(getCateListApi())
    if (err) return

    return { cates: res.data }
}


export const action = async () => {
    const article = useArtAddStore.getState().article
    console.log(article)
    //将对象格式请求体转为FormData格式请求
    const fd = new FormData()
    for (const key in article) {
        fd.append(key, article[key])
    }

    console.log(Object.fromEntries(fd))


    const [err, res] = await to(postArticleApi(fd))
    if (err) return null
    // 添加文章成功
    message.success(article.state === '草稿' ? '草稿保存成功！' : '文章发表成功！')
    return null
}