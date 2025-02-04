import React from "react";
import IconRegistry from "../../common/icons/IconRegistry";

type RoleButtonProps = {
    type: "user" | "partner";
};

const RoleButton: React.FC<RoleButtonProps> = ({ type }) => {
  return (
      <div className="flex">
        {type === "user" && (
          <div className="bg-blue-500 text-white w-full rounded-lg shadow-boxShadow">
            <div className="flex flex-col items-center justify-center px-12 py-10">
              <div className="flex items-center justify-center rounded-full pb-2">
                {IconRegistry.personicon_line}
              </div>
              <span className="text-lg font-semibold">일반</span>
            </div>

          </div>
        )}

        {type === "partner" && (
          <div className="bg-blue-500 text-white w-full rounded-lg shadow-boxShadow">
            <div className="flex flex-col items-center justify-center px-12 py-10">
              <div className="flex items-center justify-center rounded-full pb-2">
                {IconRegistry.storeicon_line}
              </div>
              <span className="text-lg font-semibold">파트너</span>
            </div>

          </div>
        )}
      </div>
  );
};


export default RoleButton;
