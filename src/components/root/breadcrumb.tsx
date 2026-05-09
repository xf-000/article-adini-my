//面包屑组件

import { useMemo, type FC } from 'react'
import { Breadcrumb } from 'antd'
import { matchPath, useAsyncValue, useLocation } from 'react-router-dom'

type BreadcrumbItem = {
    title: string
}
//递归函数，递归生成面包屑导航的数据源

const resloveBreadcrumbItems = (menus: MenuItem[] | undefined, nowPath: string, breadcrumbItems: BreadcrumbItem[] = []): BreadcrumbItem[] | undefined => {
    if (!menus) return

    for (const item of menus) {
        //路由匹配
        const matchResult = matchPath(item.key, nowPath)
        if (matchResult) {

            breadcrumbItems.unshift({ title: item.label })
            return breadcrumbItems
        }
        if (item.children) {
            const result = resloveBreadcrumbItems(item.children, nowPath, breadcrumbItems)
            if (result) {
                breadcrumbItems.unshift({ title: item.label })
                return breadcrumbItems
            }
        }

    }



}


const RootBreadcrumb: FC = () => {
    const [menuResult] = useAsyncValue() as [BaseResponse<MenuItem[]>]
    const menus = useMemo(() => menuResult.data || [], [menuResult])
    const location = useLocation()
    const nowPath = location.pathname === '/' ? '/home' : location.pathname

    const items = useMemo(
        () => resloveBreadcrumbItems(menus, nowPath), [menus, nowPath]
    )

    return <Breadcrumb items={items} />
}
export default RootBreadcrumb