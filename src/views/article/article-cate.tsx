import { delCateApi, editCateApi, getCateListApi, postCateApi } from "@/api/cate-api";
import ButtonAdd from "@/components/article-cate/btn-add";
import ButtonDelete from "@/components/article-cate/btn-del";
import ButtonEdit from "@/components/article-cate/btn-edit";
import { Button, message, Space, Table, TableProps } from "antd";
import to from "await-to-js";
import { FC } from "react";
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";


const ArticleCate: FC = () => {
    const loaderData = useLoaderData() as { cate: CateItem[] } | null
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


    return loaderData && <Space direction="vertical" style={{ display: "flex" }}>
        {/* //添加文章分类按钮 */}
        <ButtonAdd />
        {/* 表格区域 */}
        <Table
            dataSource={loaderData.cate}
            columns={columns}
            size="middle"
            rowKey='id'
            pagination={false}
            bordered
        />
    </Space>

}

export default ArticleCate


//loader
export const loader = async () => {
    const [err, res] = await to(getCateListApi())
    if (err) return null

    return { cate: res.data }
}


//action
export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()

    //获取请求的method类型
    const method = request.method.toUpperCase() as 'POST' | 'PUT' | 'PATCH' | 'DELETE'

    //由method类型决定调用接口
    //post请求：添加文章分类
    if (method === "POST") {
        const [err, res] = await to(postCateApi(fd))
        //失败
        if (err) return null
        //成功
        message.success('添加成功')
    }
    //put请求：修改文章分类
    else if (method === 'PUT') {
        const [err, res] = await to(editCateApi(fd))
        //失败
        if (err) return null
        //成功
        message.success('修改成功')
    }
    //delete请求:删除文章
    else if (method === 'DELETE') {
        const [err, res] = await to(delCateApi(fd))
        //失败
        if (err) return null
        //成功
        message.success('删除成功')
    }


    return true
}
