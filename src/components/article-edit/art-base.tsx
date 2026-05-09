import useArticleEditStore, { selectBase, updateBase, updateCurrent } from "@/store/art-edit-store";
import { Button, Form, Input, Select } from "antd";
import { FC, Suspense, useEffect } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const EditBAse: FC = () => {
    const [formRef] = Form.useForm()
    const loaderData = useLoaderData() as { cates: Promise<BaseResponse<CateItem[]>>, flag: Promise<true | undefined> }
    const baseForm = useArticleEditStore(selectBase)

    useEffect(() => {
        formRef.setFieldsValue(baseForm)
    }, [baseForm, formRef])

    const onFinish = () => {
        updateCurrent()
    }

    const handleValuesChange = (changedValues: ArticleEditBaseForm) => {
        updateBase(changedValues)
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
                initialValues={baseForm}
            >

                <Suspense fallback={<Form.Item
                    label="文章标题"
                    rules={[{ required: true, message: '请填写文章标题!' }]}>
                    <Input placeholder="请填写文章标题" maxLength={30} showCount allowClear suffix={<LoadingOutlined />} />
                </Form.Item>}>

                    <Await resolve={loaderData.flag}>
                        {() => (<Form.Item
                            label="文章标题"
                            name="title"
                            rules={[{ required: true, message: '请填写文章标题!' }]}>
                            <Input placeholder="请填写文章标题" maxLength={30} showCount allowClear />
                        </Form.Item>)}
                    </Await>
                </Suspense>

                <Suspense fallback={<Form.Item
                    label="文章分类"

                    rules={[{ required: true, message: '请选择文章分类!' }]}>
                    <Select
                        placeholder="请选择文章分类"
                        loading
                        options={[]}
                    />
                </Form.Item>}>
                    <Await resolve={loaderData.cates}>
                        {
                            (result: BaseResponse<CateItem[]>) => (
                                <>
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
                                </>
                            )
                        }
                    </Await>
                </Suspense>



            </Form>
        </>
    )
}

export default EditBAse

