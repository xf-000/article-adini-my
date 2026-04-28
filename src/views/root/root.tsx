import React from 'react';

import { Layout, } from 'antd';

import styles from '@/views/root/css/root.module.less'
import logo from '@/assets/images/logo.svg'
import RootHeader from '@/components/root/header';
import useAppStore from '@/store/app-store';
import { initUser } from '@/store/user-store';
import { getMenuApi } from '@/api/user-api';
import to from 'await-to-js';
import RootMenu from './menu';
import { Outlet } from 'react-router-dom';





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
                <RootMenu />
            </Sider>

            <Layout>
                {/* 头部区域 */}
                <RootHeader />
                {/* 内容主体 */}
                <Content className={styles.content}>
                    <Outlet />
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

export const loader = async () => {
    //获取全局用户信息
    initUser()
    //获取左侧菜单栏数据
    const [err, res] = await to(getMenuApi())
    if (err)
        return null


    return { menus: res.data }
}