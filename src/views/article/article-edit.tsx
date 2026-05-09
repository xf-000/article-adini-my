import useArticleEditStore, { initArticle, resetCurrent, updateCurrent } from "@/store/art-edit-store";
import { message, Modal, Steps } from "antd";
import { FC, useCallback, useEffect, useRef } from "react";
import { defer, LoaderFunctionArgs, useBeforeUnload, useBlocker } from "react-router-dom";
import { stepItems } from "./article-add";
import { ArticleSteps } from "@/store/art-add-store";
import EditBAse from "@/components/article-edit/art-base";
import { getCateListApi } from "@/api/cate-api";
import to from "await-to-js";
import EditCover from "@/components/article-edit/art-cover";
import EditContent from "@/components/article-edit/art-content";
import { editArticleApi } from "@/api/article-api";
import EditResult from "@/components/article-edit/art-result";





const ArticleEdit: FC = () => {
    const current = useArticleEditStore((state) => state.current)
    const modalRef = useRef<ReturnType<typeof Modal.confirm> | null>()

    //离开页面时提示是否确认离开，传入值为true时无法离开当前路由
    //currentLocation为当前url，nextLocation为将要去的url。俩参数为useBlocker内置
    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        // 如果 return 的值为 true，则需要在导航之前，弹框询问用户是否确认离开
        // 如果 return 的值为 false，则在导航离开的时候，不需要进行弹框的确认，用户可以直接离开
        return currentLocation.pathname !== nextLocation.pathname && current !== ArticleSteps.done
    })
    //将要触发导航之前，触发blocker拦截，state变化
    useEffect(() => {
        //1.判断blocker.state是否等于blocked,若成立，则弹框提问
        if (blocker.state === 'blocked') {
            //2.展示的弹框
            if (modalRef.current) return
            modalRef.current = Modal.confirm({
                title: '温馨提示',
                content: '您所做的更改将会丢失，是否确认离开当前页面？',
                okText: '确认离开',
                cancelText: '取消',
                onOk() {
                    //允许离开
                    blocker.proceed()

                },
                onCancel() {
                    //取消离开
                    blocker.reset()
                    modalRef.current = null
                }


            })
        }
    }, [blocker.state, blocker])

    //点击刷新，弹出确认刷新页面的弹框
    useBeforeUnload(
        useCallback((e) => {
            e.preventDefault()
        }, [])
    )


    return <div>
        {/* 步骤条 */}
        <Steps size="small" current={current} items={stepItems} />

        <div style={{ marginTop: 20 }}>
            {current === ArticleSteps.base && <EditBAse />}
            {current === ArticleSteps.cover && <EditCover />}
            {current === ArticleSteps.content && <EditContent />}
            {current === ArticleSteps.done && <EditResult />}
        </div>
    </div>
}

export default ArticleEdit



export const loader = async ({ params }: LoaderFunctionArgs) => {
    //回显文章的数据（根据id获取文章详细数据）
    const flag = initArticle(params.id!)
    //请求文章分类的数据
    const cates = getCateListApi()

    //重置current
    resetCurrent()

    return defer({ cates, flag })

}

export const action = async () => {
    //由于修改文章的接口所需数据量小于（根据根据id获取文章详情的数据）
    //这里对所需数据进行处理
    const article = useArticleEditStore.getState().article
    const keys = ['id', 'title', 'cate_id', 'content', 'state', 'cover_img']
    const fd = new FormData()
    for (const key of keys)
        fd.append(key, article[key])

    const [err] = await to(editArticleApi(fd))
    //修改失败
    if (err) return

    //修改成功
    //current+1
    updateCurrent()

    const msg = article.state === '草稿' ? '草稿修改成功！' : '文章修改成功！'
    message.success(article.state === '草稿' ? '草稿修改成功！' : '文章修改成功！')
    //清空文章信息的store


    return { msg: msg }
}
