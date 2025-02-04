import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../common/icons/Icon";
 

interface MenuButtonProps {
  type: "newcoup" | "gift" | "couprequest" | "couplist";
}

const MenuButton: React.FC<MenuButtonProps> = ({ type }) => {
  const navigate = useNavigate();

  const getContent = () => {
    switch (type) {
        case "newcoup":
            return { icon: <Icon name="newcoupicon" size={30}/>, message: "쿠폰 등록" };
        case "gift":
            return { icon: <Icon name="gifticon" size={30}/>, message: "선물함" };
        case "couprequest":
            return { icon: <Icon name="couprequesticon" size={30}/>, message: "쿠폰 발행 요청" };
        case "couplist":
            return { icon: <Icon name="couplisticon" size={30}/>, message: "쿠폰 배부 내역" };
        default:
            return { icon: <></>, message: ""};
    }
  }
  const { icon, message } = getContent();

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className={`flex rounded-lg shadow-custom-basic flex-col items-center justify-center bg-white menu-button-${type}`}
        onClick={() => navigate("/")}
      >
        <div className="flex items-center justify-center p-2">
          {icon} {/* 아이콘 렌더링 */}
        </div>
      </button>
      <span className="mt-2 text-xs font-medium text-black">
        {message}
      </span>
    </div>
  );
};

export default MenuButton;
