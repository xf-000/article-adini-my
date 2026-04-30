import { getCateListApi } from "@/api/cate-api";
import ButtonAdd from "@/components/root/article-cate/btn-add";
import { Button, Space, Table, TableProps } from "antd";
import to from "await-to-js";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";


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
                    <Button type='link' size="small" onClick={() => { console.log(record.id) }}>修改</Button>
                    <Button type='link' size="small" onClick={() => { console.log(record.id) }}>删除</Button>
                </>
            },
        }


    ]


    return loaderData && <Space direction="vertical" style={{ display: "flex" }}>
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

export const loader = async () => {
    const [err, res] = await to(getCateListApi())
    if (err) return null

    return { cate: res.data }
}