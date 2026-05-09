import { delCateApi, editCateApi, getCateListApi, postCateApi } from "@/api/cate-api";
import ButtonAdd from "@/components/article-cate/btn-add";
import ButtonDelete from "@/components/article-cate/btn-del";
import ButtonEdit from "@/components/article-cate/btn-edit";
import LoaderErrorElement from "@/components/common/loader-error-element";
import { message, Space, Table, TableProps } from "antd";
import to from "await-to-js";
import { FC, Suspense } from "react";
import { ActionFunctionArgs, Await, defer, useLoaderData } from "react-router-dom";


const ArticleCate: FC = () => {
    const loaderData = useLoaderData() as { result: Promise<BaseResponse<CateItem[]>> }

    const columns: TableProps<CateItem>['columns'] = [
        {
            title: '序号',
            render(_, __, index) {
                return index + 1
            }

        },
        {
            title: '分类名称',
            dataIndex: 'cate_name'

        },
        {
            title: '分类别名',
            dataIndex: 'cate_alias'

        },
        {
            title: '操作',
            render(_, record) {


                return <>
                    {/* 修改 */}
                    <ButtonEdit cate={record} />
                    {/* 删除 */}
                    <ButtonDelete id={record.id} />

                </>
            },
        }


    ]

    return (
        <Suspense fallback={<Table loading={true} />}>
            <Await resolve={loaderData.result} errorElement={<LoaderErrorElement />}>
                {
                    (result: BaseResponse<CateItem[]>) =>
                        <Space direction="vertical" style={{ display: "flex" }}>
                            {/* //添加文章分类按钮 */}
                            <ButtonAdd />
                            {/* 表格区域 */}
                            <Table
                                dataSource={result.data}
                                columns={columns}
                                size="middle"
                                rowKey='id'
                                pagination={false}
                                bordered
                            />
                        </Space>
                }
            </Await>
        </Suspense>
    )


}

export default ArticleCate




//loader 
export const loader = async () => {
    // 调用接口请求文章分类列表
    const result = getCateListApi()

    return defer({ result })
}


//action
export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()

    //获取请求的method类型
    const method = request.method.toUpperCase() as 'POST' | 'PUT' | 'PATCH' | 'DELETE'

    //由method类型决定调用接口
    //1.post请求：添加文章分类
    if (method === "POST") {
        const [err] = await to(postCateApi(fd))
        //失败
        if (err) return null
        //成功
        message.success('添加成功')
    }
    //2.put请求：修改文章分类
    else if (method === 'PUT') {
        const [err] = await to(editCateApi(fd))
        //失败
        if (err) return null
        //成功
        message.success('修改成功')
    }
    //3.delete请求:删除文章
    else if (method === 'DELETE') {
        const [err] = await to(delCateApi(fd))
        //失败
        if (err) return null
        //成功
        message.success('删除成功')
    }


    return true
}
