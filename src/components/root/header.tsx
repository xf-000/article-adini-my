import { type FC } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, } from 'antd';
import useAppStore, { setCollapsed } from '@/store/app-store';
import styles from '@/components/root/header.module.less'

import Logout from './logout';
import useUserStore, { selectAvatar, selectName } from '@/store/user-store';
import RootBreadcrumb from './breadcrumb';



const { Header } = Layout;

const RootHeader: FC = () => {
    //从zustand全局导入侧边栏展开状态
    const collapsed = useAppStore(state => state.collapsed)
    // const [collapsed, setCollapsed] = useState(false);
    const name = useUserStore(selectName)
    const avatar = useUserStore(selectAvatar)


    return (<Header className={styles.container}>
        <div className={styles.boxLeft}>
            <Button className={styles.btnCollapsed}
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
            />
            <span>欢迎:{name},当前位置为:</span>
            {/* 面包屑组件 */}
            <RootBreadcrumb />
        </div>
        <div>
            {/* 头像 */}
            {avatar ? <Avatar size="small" src={avatar} /> : <Avatar size="small" icon={<UserOutlined />} />}
            {/* 退出登录按钮 */}
            <Logout />

        </div>
    </Header>
    )

}
export default RootHeader