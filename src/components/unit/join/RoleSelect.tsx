import React from "react";
import RoleButton from "./RoleButton.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";
import {Role} from "../../../constants/role.ts";

type RoleSelectProps = {
    onSelect: (role: (typeof Role)[keyof typeof Role] | null) => void;
    onPartnerInfo: () => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({onSelect, onPartnerInfo}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-16">
            <div className="text-black text-xl font-bold w-full mt-16">어떤 유형의 회원이신가요?</div>
            <div className="flex flex-row flex-grow gap-4">
                <RoleButton type={Role.USER} onClick={() => onSelect(Role.USER)}/>
                <RoleButton type={Role.PARTNER} onClick={() => onSelect(Role.PARTNER)}/>
            </div>
            <CommonButton
                size="mini"
                isActive={true}
                mode="text"
                color="black"
                detail={{label: "파트너 회원이란?", position: "none"}}
                onClick={onPartnerInfo}
            />
        </div>
    )
}

export default RoleSelect;
