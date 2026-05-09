import { deleteArticleApi, getArticleListApi } from "@/api/article-api";
import { getCateListApi } from "@/api/cate-api";
import ArticleListSearch from "@/components/article-list/list-search";
import ArticletTable from "@/components/article-list/list-table";
import LoaderErrorElement from "@/components/common/loader-error-element";
import { Button, Flex, message, Space, Spin, Table } from "antd";
import to from "await-to-js";
import { FC, Suspense, useMemo } from "react";
import { ActionFunctionArgs, Await, defer, LoaderFunctionArgs, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";


const ArticleList: FC = () => {
    const navigate = useNavigate()
    const loaderData = useLoaderData() as { result: Promise<[BaseResponse<CateItem[]>, ArticleListResponse]>, q: ArtListQuery }
    const navigation = useNavigation()

    const navLoading = useMemo(() => {
        if (navigation.state === 'loading' && navigation.location.pathname === '/art-list')
            return true
        return false
    }, [navigation.state])


    return (
        <Suspense fallback={<Table loading={true} />}>
            <Await resolve={loaderData.result} errorElement={<LoaderErrorElement />}>

                {(result: [BaseResponse<CateItem[]>, ArticleListResponse]) => {
                    const artListResult = result[1]
                    return (
                        <Spin spinning={navLoading}>
                            <Space direction="vertical" style={{ display: "flex" }}>
                                <Flex justify="space-between">
                                    {/* 搜索组件 */}
                                    <ArticleListSearch />

                                    <Button
                                        type="primary"
                                        onClick={() => navigate('/art-add')}
                                    >添加文章
                                    </Button >
                                </Flex>

                                {/* //表格组件 */}
                                <ArticletTable
                                    dataSource={artListResult.data}
                                    rowKey='id'
                                    size="middle"
                                    bordered
                                    total={artListResult.total}
                                    {...loaderData?.q}
                                />
                            </Space>
                        </Spin>)
                }
                }
            </Await>
        </Suspense>)
}

export default ArticleList

export const loader = async ({ request }: LoaderFunctionArgs) => {


    //解析URL地址中查询参数，把字符串解析为查询参数对象q
    const searchParams = new URL(request.url).searchParams

    const q: ArtListQuery = {
        pagenum: Number(searchParams.get('pagenum')) || 1,
        pagesize: Number(searchParams.get('pagesize')) || 2,
        cate_id: Number(searchParams.get('cate_id')) || '',
        state: searchParams.get('state') || ''
    }

    // 获取文章分类的列表数据
    //获取分页的文章列表数据
    const result = Promise.all([getCateListApi(), getArticleListApi(q)])
    return defer({ q, result })


}


export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()

    const [err] = await to(deleteArticleApi(fd))
    if (err) return null

    message.success('删除成功')
    //如果删除成功了，要判断页码值是否需要回退操作
    const needBack = fd.get('needBack')
    if (needBack === 'true') {
        const url = new URL(request.url)
        const newPage = Number(url.searchParams.get('pagenum')) - 1
        url.searchParams.set('pagenum', newPage.toString())
        return redirect(url.toString())

    }


    return true  //用于判断是否关闭删除的气泡框
}