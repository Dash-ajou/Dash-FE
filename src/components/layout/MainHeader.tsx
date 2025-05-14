import { useNavigate } from "react-router-dom";
import Icon from "../common/icons/Icon";

const MainHeader = () => {
    const navigate = useNavigate();
    const { pathname } = location;
    const isPartnerPage = pathname.startsWith("/partner");

    const handleLogoClick = () => {
        navigate(isPartnerPage ? "/partner/main" : "/user/main");
    };

    const handleNotificationClick = () => {
        navigate(
            isPartnerPage ? "/partner/notification" : "/user/notifiaction"
        );
    };

    const handleMyPageClick = () => {
        navigate(isPartnerPage ? "/partner/mypage" : "/user/mypage");
    };

    return (
        <header className="w-full flex justify-between items-center bg-white pt-4">
            <span className="pl-8">
                <Icon name="logoicon" size={32} onClick={handleLogoClick} />
            </span>
            <div className="flex gap-4 pr-8">
                <Icon
                    name="bellicon_fill"
                    size={28}
                    className="cursor-pointer"
                    onClick={handleNotificationClick}
                />
                <Icon
                    name="personicon_fill"
                    size={25}
                    className="cursor-pointer"
                    onClick={handleMyPageClick}
                />
            </div>
        </header>
    );
};

export default MainHeader;
