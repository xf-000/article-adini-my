import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import BtnEditArticle from "./btn-edit";
import BtnDeleteArticle from "./btn-delete";
import { useSearchParams } from "react-router-dom";
import ListOrder from "./list-order";

const columns: TableProps<Article>['columns'] = [
    {
        title: '序号',
        render(_, __, index) {
            return <ListOrder index={index} />
        }

    },
    {
        title: '标题',
        dataIndex: 'title'

    },
    {
        title: '分类',
        dataIndex: 'cate_name'

    },
    {
        title: '发表时间',
        dataIndex: 'pub_date',
        render(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }

    },
    {
        title: '状态',
        dataIndex: 'state'

    },
    {
        title: '操作',
        render(_, record, __) {
            return <>
                <BtnEditArticle id={record.id} />
                <BtnDeleteArticle id={record.id} />
            </>
        }

    },
]

type Props = TableProps & Partial<{ total: number } & ArtListQuery>

const ArticleListtTable: FC<Props> = (props) => {
    const [, setSearchParams] = useSearchParams()

    const pageOptions = useMemo<TableProps['pagination']>(() => {

        return {
            total: props.total,
            current: props.pagenum,
            pageSize: props.pagesize,
            //每页展示多少条数据的下拉菜单选项
            pageSizeOptions: [2, 3, 5, 10, 20],
            //是否显示每页条数切换器（即允许用户改变每页显示多少条数据的选择器）
            showSizeChanger: true,
            //是否显示快速跳转输入框
            showQuickJumper: true,

            showTotal(total) {
                return `共${total}条数据`
            },
            onChange(page, pageSize) {
                setSearchParams({ pagenum: page, pagesize: pageSize, cate_id: props.cate_id, state: props.state } as unknown as { [x: string]: string })
            }


        }
    }, [props, setSearchParams])



    return <Table
        columns={columns}
        {...props}
        pagination={pageOptions}
    >

    </Table>
}

export default ArticleListtTable




