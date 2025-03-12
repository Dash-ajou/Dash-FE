import React from "react";
import Icon from "../../common/icons/Icon.tsx";

type RoleButtonProps = {
    type: "user" | "partner";
};

const RoleButton: React.FC<RoleButtonProps> = ({type}) => {
    return (
        <div
            className="bg-blue-500 rounded-lg shadow-custom-basic flex flex-col items-center justify-center px-12 py-10">
            {type === "user" && (
                <>
                    <Icon name={"personicon_line"} size={60}/>
                    <span className="text-lg font-semibold text-white">일반</span>
                </>
            )}
            {type === "partner" && (
                <>
                    <Icon name={"storeicon_line"} size={60}/>
                    <span className="text-lg font-semibold">파트너</span>
                </>
            )}
        </div>
    )
};


export default RoleButton;
