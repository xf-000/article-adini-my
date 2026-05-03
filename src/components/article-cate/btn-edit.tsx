import { useNavLoading, useNavSubmitting } from "@/utils/hooks"
import { Button, Form, Input, message, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import { FC, useEffect, useState } from "react"
import { useActionData, useSubmit } from "react-router-dom"



const ButtonEdit: FC<{ cate: CateItem }> = ({ cate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formRef] = Form.useForm()
    const submit = useSubmit()
    const submitting = useNavSubmitting('PUT')
    const loading = useNavLoading('PUT')
    const actionData = useActionData()

    //修改按钮,触发的效果
    const showEditModal = () => {

        if (cate.id === 1 || cate.id === 2) {
            message.error('此数据不可修改');
            return
        }

        //通过Form的ref引用对象，进行表单数据的回显操作
        formRef.setFieldsValue(cate)

        //显示Model对话框
        setIsModalOpen(true)

    }

    useEffect(() => {
        if (loading && actionData)
            setIsModalOpen(false)
    }, [loading, actionData])



    //保存按钮，触发效果
    const handleOk = () => {
        formRef.validateFields()

            .then((values: CateItem) => {
                submit(values, { method: 'PUT' })
            })
            .catch(() => {
                message.error('保存失败')
            })

    }


    return <>
        <Button
            type='link'
            size="small"
            onClick={showEditModal}>修改
        </Button>

        <Modal
            title="修改文章分类"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
            okText='保存'
            cancelText='取消'
            okButtonProps={{ loading: submitting && { delay: 200 } }}
            afterClose={() => formRef.resetFields()}
        >
            <Form form={formRef} autoComplete="off" style={{ marginTop: 25 }} >

                <Form.Item
                    label="id"
                    name="id"
                    hidden
                >
                    <Input readOnly />
                </Form.Item>

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
export default ButtonEdit