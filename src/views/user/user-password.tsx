import type { FC } from 'react'
import { Button, Form, Input, message, Space, Spin } from 'antd'
import { ActionFunctionArgs, useActionData, useNavigation, useSubmit } from 'react-router-dom'

import { updatePwdApi } from '@/api/user-api'
import to from 'await-to-js'

const UserPassword: FC = () => {
    const actionData = useActionData() as { result: boolean } | null
    const [formRef] = Form.useForm()
    const submit = useSubmit()
    const navigation = useNavigation()

    //密码修改成功
    if (actionData?.result)
        formRef.resetFields()

    const onFinish = (values: ResetPwdForm) => {
        submit(values, { method: 'PATCH' })
    }

    return (
        <Form form={formRef} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} autoComplete="off">
            <Spin spinning={navigation.state !== 'idle'} delay={200}>
                <Form.Item
                    label="原密码"
                    name="old_pwd"
                    validateFirst
                    rules={[
                        { required: true, message: '请填写原密码!' },
                        { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符!' }
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="新密码"
                    name="new_pwd"
                    validateFirst
                    dependencies={['old_pwd']}
                    rules={[
                        { required: true, message: '请填写新密码!' },
                        { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                //新旧密码不一致，reslove
                                if (value !== getFieldValue('old_pwd'))
                                    return Promise.resolve()
                                //新旧不一致，reject
                                return Promise.reject('新密码不能与旧密码相同')

                            }
                        })
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="确认新密码"
                    name="re_pwd"
                    validateFirst
                    dependencies={['new_pwd']}
                    rules={[
                        { required: true, message: '请再次确认新密码!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                //两次输入密码一致，reslove
                                if (value === getFieldValue('new_pwd'))
                                    return Promise.resolve()
                                //两次输入密码不一致，reject
                                return Promise.reject('两次输入密码不一致')

                            }
                        })
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit" >
                            保存
                        </Button>
                        <Button type="default" onClick={() => formRef.resetFields()}>重置</Button>
                    </Space>
                </Form.Item>
            </Spin>

        </Form>
    )
}


export default UserPassword

export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()
    const [err, res] = await to(updatePwdApi(fd))

    if (err) return null
    message.success('密码修改成功')

    return { result: true }
}

