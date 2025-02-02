import React from "react";

type RoleButtonProps = {
    type: "user" | "partner";
};

const RoleButton: React.FC<RoleButtonProps> = ({ type }) => {
  return (
      <div className="flex">
        {type === "user" && (
          <div className="flex flex-col items-center justify-center bg-blue-500 text-white w-32 h-48 rounded-lg shadow-boxShadow">
            <img
              src=".." 
              alt="일반 아이콘"
              className="w-12 h-12 mb-2"
            />
            <span className="text-lg font-semibold">일반</span>
          </div>
        )}

        {type === "partner" && (
          <div className="flex flex-col items-center justify-center bg-blue-500 text-white w-32 h-48 rounded-lg shadow-boxShadow">
            <img
              src=".."
              alt="파트너 아이콘"
              className="w-12 h-12 mb-2"
            />
            <span className="text-lg font-semibold">파트너</span>
          </div>
        )}
      </div>
  );
};

export default RoleButton;
