import React from "react";

type DetailBoxProps = {
  mode: "default" | "coupinfo" | "setting";
  title: string;
  leftstring?: string[];
  rightstring?: string[];
  rightButtonLinks?: string[];
};

const DetailBox: React.FC<DetailBoxProps> = ({
  mode,
  title,
  leftstring = [],
  rightstring = [],
  rightButtonLinks = [],
}) => {
  const leftStringStyle =
    mode === "setting" ? "font-normal text-black" : "font-semibold text-sm";
  return (
    <div
      className={`border rounded-xl px-4 py-5 shadow-sm bg-white w-[329px]`}
      style={{
        height: "auto",
      }}
    >
      <h3 className="px-1 text-base font-semibold mb-3 text-main50">{title}</h3>
      <div className=" w-[282px] h-[1px] bg-serviceColor02 mx-auto mb-4"></div>
      <div className="px-1 space-y-3">
        {leftstring.map((left, index) => (
          <div
            key={index}
            className="flex items-start"
            style={{
              gap: "12px",
            }}
          >
            <span className={`${leftStringStyle} min-w-[100px]`}>
              {left}
            </span>
            <span className="text-black text-sm font-light text-left flex-1">
              {rightstring[index] || ""}
            </span>
            {rightButtonLinks[index] && (
                <button
                    onClick={() => window.location.href = rightButtonLinks[index]}
                    className="text-black bg-transparent border-none p-0 text-lg"
                >
                    &gt;
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBox;
