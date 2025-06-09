import Icon from "../common/icons/Icon"
import { useLocation, useNavigate } from "react-router-dom"
import pageTitles from "../../constants/pageTitles"

const SubHeader = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state as { businessName?: string } | null
    const { pathname } = location

    const handleBack = () => {
        const path = location.pathname
        if (path === "/user/coupon/request/list") {
            navigate("/user/main", { replace: true })
        } else if (path.startsWith("/join") && location.search.includes("step=complete")) {
            navigate("/", { replace: true })
        } else if (path === "/partner/request/approve") {
            navigate("/partner/request/list", { replace: true })
        } else if (path === "/partner/request/list") {
            navigate("/partner/main", { replace: true })
        } else if (path === "/user/coupon/published" && state?.fromCancel) {
            navigate("/user/main", { replace: true });
        } else {
            navigate(-1)
        }
    }

    if (pathname === "/user/coupon/published/detail") {
        return (
            <header className="w-full flex items-center px-6 pt-6 pb-3">
                <Icon name="arrowicon_line_left" onClick={() => navigate(-1)} />
                <h1 className="ml-4 text-xl font-bold text-black">
                    {state?.businessName || "쿠폰 통계"}
                </h1>
            </header>
        )
    }

    const matchedTitleKey = Object.keys(pageTitles)
        .sort((a, b) => b.length - a.length)
        .find((key) => pathname.startsWith(key))

    const pageTitle = matchedTitleKey ? pageTitles[matchedTitleKey] : "페이지 없음"

    return (
        <header className="w-full flex items-center px-6 pt-6 pb-3">
            <Icon name="arrowicon_line_left" onClick={handleBack} />
            <h1 className="ml-4 text-xl font-bold text-black">{pageTitle}</h1>
        </header>
    )
}

export default SubHeader
