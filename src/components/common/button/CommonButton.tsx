import React, {HTMLAttributes} from 'react';
import IconRegistry from "../icons/IconRegistry.tsx";
import Icon from "../icons/Icon.tsx";

type CommonButtonProps = {
    size: "mini" | "small" | "normal" | "large";
    isActive: boolean;
    mode: "fill" | "line" | "text" | "ghost";
    color: "blue" | "red" | "gray" | "black";
    detail: {
        label: string;
        position: "right" | "left" | "none";
        icon?: keyof typeof IconRegistry;
    };
} & HTMLAttributes<HTMLButtonElement>;

/*
mini: 로그아웃, 회원 탈퇴 등 텍스트 버튼
small: 모달 버튼
normal: half 버튼
large: 일반 긴 버튼

fill: 배경 색이 채워진 버튼 (글자색 흰색, 배경색이 color)
line: 배경에 색이 없는 버튼 (테두리, 글자색이 color)
text: 텍스트에 밑줄만 있는 버튼 (글자색이 color) -> 밑줄 유무 체크하게 해야하나?
ghost: 배경이 흰색이고 테두리가 회색인 버튼 (partnerMainButton) (글자색이 color)
*/

const baseStyles =
    "flex items-center justify-center rounded-xl transition";

// Size styles
const sizeStyles = {
    mini: "py-1 text-sm",
    small: "flex-1 py-3 text-sm font-bold",
    normal: "px-3 py-4 text-base font-bold flex-none w-40",
    large: "flex-1 py-4 text-base font-bold",
};

// Color styles
const colorStyles = {
    blue: "text-white bg-blue-500 hover:bg-blue-600",
    red: "text-white bg-red-500 hover:bg-red-600",
    gray: "text-black bg-gray-200 hover:bg-gray-300",
    black: "text-black",
};

const CommonButton: React.FC<CommonButtonProps> = ({
                                                       size,
                                                       isActive,
                                                       mode,
                                                       color,
                                                       detail,
                                                       ...props
                                                   }) => {
    // Mode styles
    const modeStyles = {
        fill: `shadow ${colorStyles[color]}`,
        line: `border-2 border-${color}-500 text-${color}-500 bg-transparent`,
        text: `${color=="black" ? 'text-black' : `text-${color}-500`} underline bg-transparent`,
        ghost: `border-2 border-gray-300 bg-white text-${color}-500`,
    };

    // Disabled styles
    const disabledStyles = isActive
        ? ""
        : "cursor-not-allowed opacity-50 hover:bg-none";

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${modeStyles[mode]} ${disabledStyles}`}
            {...props}
        >
            {detail.icon && detail.position === "left" && (
                <span className="mr-2">
                    <Icon name={detail.icon}/>
                </span>
            )}
            {detail.label}
            {detail.icon && detail.position === "right" && (
                <span className="ml-2">
                    <Icon name={detail.icon}/>
                </span>
            )}
        </button>
    )
};

export default CommonButton;
