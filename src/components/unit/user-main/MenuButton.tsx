import React from 'react';
import { useNavigate } from 'react-router-dom';

type MenuButtonType = "newcoup" | "gift" | "couprequest" | "couplist";

interface MenuButtonProps {
	type: MenuButtonType;
}

const MenuButton: React.FC<MenuButtonProps> = ({ type }) => {
    const navigate = useNavigate();

    const getText = (type: MenuButtonType): string => {
        switch (type) {
            case "newcoup":
                return "쿠폰 등록";
            case 'gift':
                return "선물함";
            case 'couprequest':
                return "쿠폰 발행 요청";
            case 'couplist':
                return "쿠폰 배부 내역";
            default: 
                return "";
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <button
            className={`w-16 h-16 rounded-lg shadow-custom flex flex-col items-center justify-center bg-white menu-button-#{type}`}
            onClick={() => navigate('/')} /* 일단 비워둠 */
            >
            <div className="w-10 h-10 flex items-center justify-center mb-1">
                {/* 아이콘 */}
            </div>
        </button>
        <span className="mt-1 text-xs font-medium text-black">{getText(type)}</span>
        </div>

    )
};


export default MenuButton;