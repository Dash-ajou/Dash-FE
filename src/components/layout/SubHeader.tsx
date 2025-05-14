import Icon from "../common/icons/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import pageTitles from "../../constants/pageTitles";

const SubHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as { businessName?: string } | null;
    const { pathname } = location;

    if (pathname === "/user/coupon/published/detail") {
        return (
            <header className="w-full flex items-center px-6 pt-6 pb-3">
                <Icon name="arrowicon_line_left" onClick={() => navigate(-1)} />
                <h1 className="ml-4 text-xl font-bold text-black">
                    {state?.businessName || "쿠폰 통계"}
                </h1>
            </header>
        );
    }

    const matchedTitleKey = Object.keys(pageTitles).find((key) =>
        pathname.startsWith(key)
    );

    const pageTitle = matchedTitleKey
        ? pageTitles[matchedTitleKey]
        : "페이지 없음";

    return (
        <header className="w-full flex items-center px-6 pt-6 pb-3">
            <Icon name="arrowicon_line_left" onClick={() => navigate(-1)} />
            <h1 className="ml-4 text-xl font-bold text-black">{pageTitle}</h1>
        </header>
    );
};

export default SubHeader;
