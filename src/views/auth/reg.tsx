import type { FC } from 'react'
import { Button, Form, Input, message, Space } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ActionFunctionArgs, NavLink, redirect, useSubmit } from 'react-router-dom'
import { regApi } from '@/api/auth-api'
import to from 'await-to-js'
import { useNavSubmitting } from '@/utils/hooks'

//----------------注册-------------------
const Reg: FC = () => {

    const submit = useSubmit()
    const submintting = useNavSubmitting('POST')
    const onFinish = (values: RegForm) => {
        submit(values, {
            method: 'POST'
        })
    }

    return (
        //注册页
        <Form onFinish={onFinish} size="large">
            {/* 用户名 */}
            <Form.Item name="username" rules={[
                { required: true, message: '请输入用户名!' },
                { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位的字母数字!' }
            ]}>
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            {/* 密码 */}
            <Form.Item name="password" rules={[
                { required: true, message: '请输入密码!' },
                { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符!' }
            ]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            {/* 确认密码 */}
            <Form.Item
                name="repassword"
                validateFirst
                dependencies={['password']}
                rules={[
                    { required: true, message: '请确认密码!' },
                    { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (value == getFieldValue('password'))
                                return Promise.resolve()
                            return Promise.reject(new Error('两次不一致!'))
                        }

                    })

                ]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
                <Space direction="vertical">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={submintting && { delay: 200 }}
                        disabled={submintting}
                    >
                        Register
                    </Button>
                    <div>
                        Or <NavLink to="/login">login now!
                        </NavLink>
                    </div>
                </Space>
            </Form.Item>
        </Form>
    )
}


export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()
    // const data = Object.fromEntries(fd) as RegForm

    //-------------调用接口------------------
    const [err] = await to(regApi(fd))
    //--------------注册失败---------------
    if (err) {
        return null
    }
    //--------------注册成功---------------
    message.success('注册成功')
    return redirect('/login?uname=' + fd.get('username'))
}



export default Reg