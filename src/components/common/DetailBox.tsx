import React from "react";
import Status from "./Status";
import { Link } from "react-router-dom"; // ✅ OK!

type DetailBoxProps = {
    mode: "default" | "coupinfo" | "setting";
    title: string;
    leftstring?: string[];
    rightstring?: string[];
    linkurl?: string[];
    statusType?: "used" | "unused";
    statusColor?: "red" | "green";
};

const DetailBox: React.FC<DetailBoxProps> = ({
    mode,
    title,
    leftstring = [],
    rightstring = [],
    linkurl = [],
    statusType,
    statusColor = "gray",
}) => {
    const leftStringStyle =
        mode === "setting"
            ? "font-normal text-base text-black hover:underline cursor-pointer"
            : "font-semibold text-sm";

    return (
        <div className="border rounded-xl px-4 py-5 shadow-custom-basic bg-white w-full h-auto">
            <div className="flex justify-between mb-3">
                <h3 className="px-1 text-base font-semibold text-blue-500">
                    {title}
                </h3>
                {mode === "coupinfo" && statusType && (
                    <Status
                        statusType={statusType}
                        color={statusColor as "red" | "green"}
                    />
                )}
            </div>
            <hr className="w-full border-t border-black h-[1px] mx-auto mb-4" />
            <div className="px-1 space-y-3">
                {leftstring.map((left, index) => {
                    const url = linkurl[index] || "#";
                    const content = (
                        <span className={`${leftStringStyle} min-w-[90px]`}>
                            {left}
                        </span>
                    );

                    return (
                        <div key={index} className="flex items-start gap-3">
                            {mode === "setting" ? (
                                <Link to={url}>{content}</Link>
                            ) : (
                                content
                            )}
                            {mode !== "setting" && (
                                <span className="text-black text-sm font-light text-left flex-1">
                                    {rightstring[index] || ""}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DetailBox;
