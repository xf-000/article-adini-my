import { useNavLoading, useNavSubmitting } from "@/utils/hooks"
import { Button, Form, Input, Modal } from "antd"
import { FC, useEffect, useState } from "react"
import { useActionData, useSubmit } from "react-router-dom"


const ButtonAdd: FC = () => {
    //控制对话框的状态：flase为隐藏
    const [isModalOpen, setIsModalOpen] = useState(false)
    const submit = useSubmit()
    const [formRef] = Form.useForm()
    const actionData = useActionData()
    const loading = useNavLoading('POST')
    const submitting = useNavSubmitting('POST')


    const handleOk = () => {
        //手动触发表单校验
        //获得校验通过的数据
        formRef
            .validateFields()
            .then((values: ArtCateAddForm) => {
                //提交获得的数据
                submit(values, { method: 'POST' })
            })
            .catch((err) => {
                console.log('校验失败', err)
            })



    }

    //数据上传成功，loading变为true，关闭对话框
    useEffect(() => {
        if (actionData && loading)
            setIsModalOpen(false)
    }, [actionData, loading])


    return <><Button type="primary" onClick={() => setIsModalOpen(true)}>添加分类</Button>
        <Modal
            title="添加文章分类"
            open={isModalOpen}
            onOk={handleOk}
            cancelText='取消'
            okText='添加'
            okButtonProps={{
                loading: submitting && { delay: 200 }
            }}
            onCancel={() => setIsModalOpen(false)}
            afterClose={() => {
                formRef.resetFields()
            }}
        >
            <Form form={formRef} autoComplete="off" style={{ marginTop: 25 }}>

                <Form.Item
                    label="分类名称"
                    name="cate_name"
                    rules={[
                        { required: true, message: '请填写分类名称!' },
                        { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10位的非空字符!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="分类别名"
                    name="cate_alias"
                    rules={[
                        { required: true, message: '请填写分类别名!' },
                        { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字!' }
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    </>
}


export default ButtonAdd

