import useArtAddStore, { Move, selectArticleBase, setArticleBase, setCurrent } from "@/store/art-add-store"
import { Button, Form, Input, Select } from "antd"
import type { FormProps } from 'antd'
import { FC, Suspense, useLayoutEffect } from "react"
import { Await, useLoaderData } from "react-router-dom"



const ArticleBase: FC = () => {
    const loaderData = useLoaderData() as { result: Promise<BaseResponse<CateItem[]>> }
    const [formRef] = Form.useForm()
    const baseForm = useArtAddStore(selectArticleBase)

    const onFinish = (values: unknown) => {
        setCurrent(Move.next)
    }

    useLayoutEffect(() => {
        //回填数据
        formRef.setFieldsValue(baseForm)
    }, [formRef, baseForm])

    const handleValuesChange: FormProps['onValuesChange'] = (changedValues: ArticleAddBaseForm) => {
        //将数据传入store
        setArticleBase(changedValues)
    }
    return (
        <>
            <Form
                form={formRef}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                onValuesChange={handleValuesChange}
            >

                <Form.Item
                    label="文章标题"
                    name="title"
                    rules={[{ required: true, message: '请填写文章标题!' }]}>
                    <Input placeholder="请填写文章标题" maxLength={30} showCount allowClear />
                </Form.Item>

                <Suspense fallback={
                    <Form.Item
                        label="文章分类"
                        rules={[{ required: true, message: '请选择文章分类!' }]}>
                        <Select placeholder="请选择文章分类" options={[]} loading />
                    </Form.Item>}>

                    <Await resolve={loaderData.result}>
                        {(result: BaseResponse<CateItem[]>) => (<>
                            <Form.Item
                                label="文章分类"
                                name="cate_id"
                                rules={[{ required: true, message: '请选择文章分类!' }]}>
                                <Select
                                    placeholder="请选择文章分类"
                                    allowClear
                                    options={result.data}
                                    fieldNames={{ label: 'cate_name', value: 'id' }}
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    下一步
                                </Button>
                            </Form.Item>
                        </>)
                        }


                    </Await>
                </Suspense>



            </Form>
        </>
    )
}

export default ArticleBase

