import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();
    const isMainPage = [
        "/user/main",
        "/partner/main",
        "/user/mypage",
        "/partner/mypage",
    ].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col">
            {isMainPage ? <MainHeader /> : <SubHeader />}
            <main className="flex-grow px-6">{children}</main>
        </div>
    );
};

export default Layout;
