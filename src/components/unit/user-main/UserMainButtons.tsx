import React from "react";
import MenuButton from "./MenuButton";

const UserMainButtons: React.FC = () => {
    return (
        <div className="flex justify-between items-center gap-4">
            <MenuButton type="newcoup" onClick={() => console.log("쿠폰 등록 클릭됨")} />
            <MenuButton type="gift" onClick={() => console.log("선물함 클릭됨")} />
            <MenuButton type="couprequest" onClick={() => console.log("쿠폰 발행 요청 클릭됨")} />
            <MenuButton type="couplist" onClick={() => console.log("쿠폰 배부 내역 클릭됨")} />
        </div>
    );
};

export default UserMainButtons;