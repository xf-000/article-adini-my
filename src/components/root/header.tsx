import { type FC } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,

} from '@ant-design/icons';
import { Avatar, Button, Layout, theme } from 'antd';
import useAppStore, { setCollapsed } from '@/store/app-store';
import styles from '@/components/root/header.module.less'
import { Form } from 'react-router-dom';
import Logout from './logout';


const { Header } = Layout;

const RootHeader: FC = () => {
    //从zustand全局导入侧边栏展开状态
    const collapsed = useAppStore(state => state.collapsed)
    // const [collapsed, setCollapsed] = useState(false);



    return (<Header className={styles.container}>
        <div>
            <Button className={styles.btnCollapsed}
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
            />
            <span>欢迎:xxx,当前位置为:</span>
        </div>
        <div>
            {/* 头像 */}
            <Avatar size="small" icon={<UserOutlined />} />
            {/* 退出登录按钮 */}

            <Logout />


        </div>
    </Header>
    )

}
export default RootHeader