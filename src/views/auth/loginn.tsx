import { Button, Form, Input, message, Space } from 'antd'
import type { FC } from 'react'
import { ActionFunctionArgs, NavLink, useFetcher, useSearchParams } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { loginApi } from '@/api/auth-api'
import to from 'await-to-js'
//导入store修改函数
import { setToken } from '@/store/app-store'

//------------登录---------------
const Login: FC = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const loginFetcher = useFetcher()


    const onFinish = (values: LoginForm) => {
        loginFetcher.submit(values, { method: 'POST' })
    }

    return (
        <Form size="large" onFinish={onFinish} initialValues={{ username: searchParams.get('uname') }}>

            <Form.Item name="username" rules={[
                { required: true, message: '请输入用户名！' },
                { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位的字母数字!' }
            ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="password" rules={[
                { required: true, message: '请输入密码！' },
                { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符!' }
            ]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Space direction="vertical">
                    <Button type="primary" htmlType="submit" loading={loginFetcher.state != 'idle' && { delay: 200 }}
                    >
                        Log in
                    </Button>
                    <div>
                        Or <NavLink to="/reg">register now!</NavLink>
                    </div>
                </Space>
            </Form.Item>

        </Form>
    )
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData()

    const [err, result] = await to(loginApi(fd))
    //----------登陆失败-------------
    if (err) {
        return null
    }
    //----------登陆成功------------------
    //全局存储登录后的token值
    setToken(result.token)

    message.success('登陆成功')
    //跳转至后台主页
    // return redirect('/')
    return null

}



export default Login