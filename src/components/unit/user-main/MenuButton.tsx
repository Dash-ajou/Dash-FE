import Icon from "../../common/icons/Icon";

type MenuButtonType = "newcoup" | "gift" | "couprequest" | "couplist";

interface MenuButtonProps {
    type: MenuButtonType;
    onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ type, onClick }) => {
    const getContent = () => {
        switch (type) {
            case "newcoup":
                return {
                    icon: <Icon name="newcoupicon" size={50} />,
                    message: "쿠폰 등록",
                };
            case "gift":
                return {
                    icon: <Icon name="gifticon" size={50} />,
                    message: "선물함",
                };
            case "couprequest":
                return {
                    icon: <Icon name="couprequesticon" size={50} />,
                    message: "쿠폰 발행 요청",
                };
            case "couplist":
                return {
                    icon: <Icon name="couplisticon" size={50} />,
                    message: "쿠폰 배부 내역",
                };
            default:
                return { icon: <></>, message: "" };
        }
    };
    const { icon, message } = getContent();

    return (
        <div className="flex flex-col justify-center items-center">
            <button
                className={`flex rounded-lg shadow-custom-basic flex-col items-center justify-center bg-white menu-button-${type}`}
                onClick={onClick}
            >
                <div className="flex items-center justify-center p-2">
                    {icon}
                </div>
            </button>
            <span className="mt-1.5 text-xs font-normal text-black">
                {message}
            </span>
        </div>
    );
};

export default MenuButton;
