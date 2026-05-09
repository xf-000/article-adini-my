import { FC, useState } from "react"
import { Menu, MenuProps, } from 'antd';
import { useAsyncValue, useLocation, useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    ReadOutlined,
    AppstoreOutlined,
    ProfileOutlined,
    FileAddOutlined,
    FileTextOutlined,
    UserOutlined,
    SolutionOutlined,
    PictureOutlined,
    KeyOutlined
} from '@ant-design/icons'


const iconMap = {
    // 键: 值
    // icon 的名字: 要替换成的图标组件
    HomeOutlined: <HomeOutlined />,
    ReadOutlined: <ReadOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    ProfileOutlined: <ProfileOutlined />,
    FileAddOutlined: <FileAddOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    UserOutlined: <UserOutlined />,
    SolutionOutlined: <SolutionOutlined />,
    PictureOutlined: <PictureOutlined />,
    KeyOutlined: <KeyOutlined />
}

//递归处理菜单图标项
const resolveMenuIcon = (menus: MenuItem[]) => {
    for (const menu of menus) {
        const iconName = menu.icon as keyof typeof iconMap
        menu.icon = iconMap[iconName]

        if (menu.children) {
            resolveMenuIcon(menu.children)
        }
    }
}

//递归查找需要被展开的菜单项的 key 值
const getOpenKey = (menus: MenuItem[] | undefined, selectedKeys: string, parentKey: string = ''): string => {
    if (!menus) return ''
    for (const item of menus) {
        //当前为父节点
        if (item.key == selectedKeys) {
            return parentKey
        }
        //当前为子节点
        if (item.children) {
            const result = getOpenKey(item.children, selectedKeys, item.key)
            //如果找到了
            if (result) {
                return result
            }
        }


    }
    return ''
}

//------------------菜单栏组件-------------
//定义主菜单
const rootSubmenuKeys = ['2', '3']




const RootMenu: FC = () => {
    const [menuResult] = useAsyncValue() as [BaseResponse<MenuItem[]>]
    const menus = menuResult.data || []
    const navigate = useNavigate()
    const location = useLocation()
    //默认选中的菜单项的key
    const selectedKey = location.pathname === '/' ? '/home' : location.pathname

    const [openKeys, setOpenKeys] = useState<string[]>([getOpenKey(menus, selectedKey)])

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }


    // if (!data) return

    // const { menus } = data
    //递归处理侧边栏图标
    resolveMenuIcon(menus)


    const onMenusItemClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key)
    }



    return (
        <><Menu
            theme="dark"
            mode="inline"
            items={menus}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onMenusItemClick}
            selectedKeys={[selectedKey]}
        />
        </>)
}


export default RootMenu

