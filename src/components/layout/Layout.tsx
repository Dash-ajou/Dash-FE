import { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import MainHeader from "./MainHeader"
import SubHeader from "./SubHeader"

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation()
    const isMainPage = ["/user/main", "/partner/main", "/user/mypage", "/partner/mypage"].includes(
        location.pathname
    )

    return (
        <div className="min-h-screen flex flex-col overflow-y-auto">
            {isMainPage ? <MainHeader /> : <SubHeader />}
            <main className="px-6 pb-6 overflow-y-auto h-[calc(100vh-60px)]">{children}</main>
        </div>
    )
}

export default Layout
