import React from "react";

type ListButtonProps = {
    coupnum: string;
    coupstatus?: "Issued" | "Registered" | "Used";
    name?: string;
};

const ListButton: React.FC<ListButtonProps> = ({ coupnum, coupstatus, name }) => {
    // 상태에 따른 텍스트 생성
    const getContent = () => {
        switch (coupstatus) {
            case "Issued":
                return "미등록";
            case "Registered":
                return `${name ? `${name}/` : ""}등록완료`;
            case "Used":
                return `${name ? `${name}/` : ""}사용완료`;
            default:
                return ""; // 상태가 없을 경우 기본값
        }
    };

    return (
        <div className="flex items-center justify-between w-full px-6 py-4 rounded-[12px] bg-blue-50 text-[12px] text-black font-normal my-1 ">
            {/* 왼쪽: coupnum */}
            <span>{coupnum}</span>
            {/* 오른쪽: 상태 및 이름 */}
            <span>{getContent()}</span>
        </div>
    );
};

export default ListButton;
