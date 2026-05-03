
import { createStorage } from "@/utils/storage";
import { create } from "zustand";
import { devtools, persist, } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";




type ArtAddStore = {
    current: ArticleSteps
    article: ArticleAddForm
    _hasHydrated: boolean
}

//添加文章进度条的step
export enum Move {
    pre = -1,
    next = 1
}

//current的值
export enum ArticleSteps {
    base = 0,
    cover = 1,
    content = 2,
    done = 3
}

//zustand数据：进度条，文章信息
const initState: ArtAddStore = {
    current: ArticleSteps.base,
    article: {} as ArticleAddForm,
    _hasHydrated: false
}




const useArtAddStore = create<ArtAddStore>()(
    immer(
        devtools(
            persist(
                () => {


                    return { ...initState }
                },
                {
                    name: 'art-add-store',
                    storage: createStorage<ArtAddStore>(), onRehydrateStorage() {
                        return () => {
                            //数据异步读取完毕执行以下函数
                            useArtAddStore.setState((state) => {
                                state._hasHydrated = true
                            })
                        }
                    }
                }
            ),
            { name: 'art-add-store' }
        )
    )
)



export default useArtAddStore

//修改current的函数
export const setCurrent = (step: Move = Move.next) => {
    useArtAddStore.setState((state: ArtAddStore) => {
        state.current += step
    })
}

// 实时存储文章基本信息的数据(标题和分类)
export const setArticleBase = (formData: ArticleAddBaseForm) => {
    useArtAddStore.setState((state) => {
        state.article = { ...state.article, ...formData }
    })
}

//存储文章封面
export const setArticleCover = (cover: Blob) => {
    useArtAddStore.setState((state) => {
        state.article.cover_img = cover
    })
}

//存储文章内容
export const setContent = (content: string) => {
    useArtAddStore.setState((state) => {
        state.article.content = content
    })
}

//存储文章发布状态
export const setArticleState = (artState: '草稿' | '已发布') => {
    useArtAddStore.setState((state) => {
        state.article.state = artState
    })
}




//selectors
export const selectArticleBase = (state: ArtAddStore) => ({
    title: state.article.title,
    cate_id: state.article.cate_id
    // content: string
    // state: '草稿' | '已发布'
    // cover_img: Blob
})


export const selectCover = (state: ArtAddStore) => {
    const cover = state.article.cover_img
    if (cover) {
        // 把封面的文件，转为 URL 字符串并 return
        return URL.createObjectURL(cover)
    } else {
        // 没有封面
        return null
    }
}