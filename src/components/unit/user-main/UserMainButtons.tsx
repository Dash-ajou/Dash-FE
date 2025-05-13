import MenuButton from "./MenuButton";
import {useNavigate} from "react-router-dom";

const UserMainButtons: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center gap-4">
            <MenuButton
                type="newcoup"
                onClick={() => navigate("/user/coupon/register")}
            />
            <MenuButton
                type="gift"
                onClick={() => navigate("/user/gift")}
            />
            <MenuButton
                type="couprequest"
                onClick={() => navigate("/user/coupon/request/list")}
            />
            <MenuButton
                type="couplist"
                onClick={() => navigate("/user/coupon/published")}
            />
        </div>
    );
};

export default UserMainButtons;
