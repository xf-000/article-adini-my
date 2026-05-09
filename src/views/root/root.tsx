import React, { Suspense } from 'react';

import { Layout, Spin, } from 'antd';

import styles from '@/views/root/css/root.module.less'
import logo from '@/assets/images/logo.svg'
import RootHeader from '@/components/root/header';
import useAppStore from '@/store/app-store';
import { initUser } from '@/store/user-store';
import { getMenuApi } from '@/api/user-api';
import RootMenu from './menu';
import { Await, defer, Outlet, useLoaderData } from 'react-router-dom';





const { Sider, Content, Footer } = Layout;

const Root: React.FC = () => {

    const collapsed = useAppStore(state => state.collapsed)
    const loaderData = useLoaderData() as { result: Promise<[BaseResponse<MenuItem[]>, null | undefined]> }

    return (
        <Suspense fallback={<Spin fullscreen />}>
            <Await resolve={loaderData.result}>
                {
                    () => {
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
                        )
                    }
                }
            </Await>
        </Suspense>
    );
};

export default Root;

export const loader = async () => {
    //获取左侧菜单栏数据
    //获取全局用户信息
    const result = Promise.all([getMenuApi(), initUser()])


    return defer({ result })
}