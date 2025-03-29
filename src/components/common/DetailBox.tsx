import React from "react";
import Status from "./Status";

type DetailBoxProps = {
  mode: "default" | "coupinfo" | "setting";
  title: string;
  leftstring?: string[];
  rightstring?: string[];
  rightButtonLinks?: string[];
  statusType?: "used" | "unused";
  statusColor?: "red" | "green";
};

const DetailBox: React.FC<DetailBoxProps> = ({
  mode,
  title,
  leftstring = [],
  rightstring = [],
  // rightButtonLinks = [],
  statusType,
  statusColor = "gray",
}) => {
  const leftStringStyle =
    mode === "setting"
      ? "font-normal text-base text-black"
      : "font-semibold text-sm";
  return (
    <div
      className={`border rounded-xl px-4 py-5 shadow-custom-basic bg-white w-full h-auto`}
    >
      <div className="flex justify-between mb-3">
        <h3 className="px-1 text-base font-semibold text-blue-500">{title}</h3>
        {mode === "coupinfo" && statusType && (
          <Status
            statusType={statusType}
            color={statusColor as "red" | "green"}
          />
        )}
      </div>
      <hr className="w-full border-t border-black h-[1px] mx-auto mb-4" />
      <div className="px-1 space-y-3">
        {leftstring.map((left, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className={`${leftStringStyle} text-black min-w-[90px]`}>
              {left}
            </span>
            <span className="text-black text-sm font-light text-left flex-1">
              {rightstring[index] || ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBox;
