import React, { useState } from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, } from 'antd';

import styles from '@/views/root/css/root.module.less'
import logo from '@/assets/images/logo.svg'
import RootHeader from '@/components/root/header';
import useAppStore from '@/store/app-store';
import { initUser } from '@/store/user-store';




const { Sider, Content, Footer } = Layout;

const Root: React.FC = () => {
    const collapsed = useAppStore(state => state.collapsed)



    return (
        <Layout className={styles.container}>
            {/* 侧边栏 */}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                {/* logo区域 */}
                <div className={styles.boxLogo} >
                    <img src={logo} alt="logo" className={styles.logo} />
                    {/* 按需展示文字 */}
                    {!collapsed && <span className={styles.logoText}>文章管理系统</span>}
                </div>
                {/* 左侧菜单 */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>

            <Layout>
                {/* 头部区域 */}
                <RootHeader />
                {/* 内容主体 */}
                <Content className={styles.content}>
                    Content
                </Content>
                {/* 底部区域 */}
                <Footer className={styles.footer}>
                    powered by xf
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Root;

export const loader = () => {
    initUser()
    return null
}