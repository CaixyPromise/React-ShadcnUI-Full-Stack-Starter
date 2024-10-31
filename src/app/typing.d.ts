import {UserRoleEnum} from "@/enums/access";
import {IconName} from "@/components/ui/icons";

export interface LoginUser extends API.LoginUserVO {
    id?: number | string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole: UserRoleEnum;
    userEmail?: string;
}

export type NavigationMenuProps = {
    items: Array<MenuItemProps>
    collapsedRow: number
}

export type MenuItemProps = {
    name: string,
    path: string,
    icon?: IconName,
    redirect?: string
    children?: MenuItemProps[]
    access?: UserRoleEnum,
    target?: string
}

export type FooterProps = {
    copyright: string;
    links: Array<{
        href: string;
        label: string;
        icon?: IconName;
        onClick?: () => void;
    }>
}

export type AvatarMenuProps = {
    user: LoginUser,
    onLoginMenu: Omit<MenuItemProps, "children">
    onLogout: () => void
}


export type LayoutRuntimeProps = {
    /**
     * 导航栏选项配置
     */
    navigationMenu: NavigationMenuProps,
    /**
     * footer配置
     */
    footer: FooterProps,
    /**
     * 是否显示header搜索栏
     */
    showSearch: boolean,
    /**
     * 顶部导航栏是否黏附在顶层？
     */
    isHeaderSticky: boolean;
}

export type InitialState = {
    currentUser: LoginUser | null,
    fetchUserInfo: () => Promise<LoginUser | null>
}
