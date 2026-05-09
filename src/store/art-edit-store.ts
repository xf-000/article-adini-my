import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ArticleSteps, Move } from './art-add-store'
import { createStorage } from '@/utils/storage'
import { immer } from 'zustand/middleware/immer'
import { getArticleApi } from '@/api/article-api'
import to from 'await-to-js'
import config from '@/config.json'


type EditStore = {
    article: ArticleEditForm
    current: ArticleSteps

}

const initialState = {
    article: {} as ArticleEditForm,
    current: ArticleSteps.base
}



const useArticleEditStore = create<EditStore>()(
    immer(
        devtools(
            persist(
                () => {
                    // 这里 return 的对象，就是 store 中全局存储的数据
                    return {
                        ...initialState
                    }
                },
                {
                    name: 'art-edit-store',
                    // 自定义存储引擎
                    storage: createStorage(),
                    // 自定义要在本地持久化存储哪些数据
                    partialize(state) {
                        return { article: state.article }
                    }
                }
            ),
            { name: 'art-edit-store' }
        )
    )
)

export default useArticleEditStore



export const initArticle = async (id: string) => {
    //调用获取文章详情的接口
    const [err, res] = await to(getArticleApi(id))
    if (err) return
    //将返回的数据导入store
    useArticleEditStore.setState((state) => {
        if (res.data) {
            state.article = res.data
        }
    })
    return true
}



//selector
//base
export const selectBase = (state: EditStore) => ({
    title: state.article.title,
    cate_id: state.article.cate_id
})
//选择文章封面
export const selectCover = (state: EditStore) => {
    const cover = state.article.cover_img
    if (typeof cover == 'string') {
        return config.baseURL + cover

    } else {
        // 把封面的文件，转为 URL 字符串并 return
        return URL.createObjectURL(cover)
    }
}
//article数据
export const selectArticle = (state: EditStore) => state.article





//修改store的函数
export const updateBase = (value: ArticleEditBaseForm) => {
    useArticleEditStore.setState((state) => {
        state.article = { ...state.article, ...value }
    })
}
//修改current
export const updateCurrent = (step: Move = Move.next) => {
    useArticleEditStore.setState((state) => {
        state.current += step
    })
}

//重置current
export const resetCurrent = () => {
    useArticleEditStore.setState((state) => {
        state.current = ArticleSteps.base
    })
}


//修改文章封面
export const setArticleCover = (cover: Blob) => {
    useArticleEditStore.setState((state) => {
        state.article.cover_img = cover
    })
}

//存储文章内容
export const setContent = (content: string) => {
    useArticleEditStore.setState((state) => {
        state.article.content = content
    })
}

//存储文章发布状态
export const setArticleState = (artState: '草稿' | '已发布') => {
    useArticleEditStore.setState((state) => {
        state.article.state = artState
    })
}

