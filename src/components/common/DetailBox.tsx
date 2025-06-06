import React from "react"
import { Link } from "react-router-dom"
import Status from "./Status"
import Icon from "./icons/Icon"

type DetailBoxProps = {
    mode: "default" | "coupinfo" | "setting"
    title: string
    leftstring?: (string | React.ReactNode)[]
    rightstring?: string[]
    linkurl?: string[]
    onClicks?: (() => void)[]
    statusType?: "used" | "unused"
    statusColor?: "red" | "green"
    requestList?: { name: string; count: number }[]
}

const DetailBox: React.FC<DetailBoxProps> = ({
    mode,
    title,
    leftstring = [],
    rightstring = [],
    linkurl = [],
    onClicks = [],
    statusType,
    statusColor = "gray",
    requestList,
}) => {
    const rowCount = Math.max(leftstring.length, rightstring.length, linkurl.length)

    return (
        <div className="border rounded-xl px-4 py-5 shadow-custom-basic bg-white w-full h-auto">
            <div className="flex justify-between mb-3">
                <h3 className="px-1 text-base font-semibold text-blue-500">{title}</h3>
                {mode === "coupinfo" && statusType && (
                    <Status statusType={statusType} color={statusColor as "red" | "green"} />
                )}
            </div>

            <hr className="w-full border-t border-black h-[1px] mx-auto mb-4" />

            {mode === "setting" ? (
                <div className="flex flex-row justify-between pl-3">
                    <div className="flex flex-col gap-2.5 items-start">
                        {Array.from({ length: rowCount }).map((_, i) => (
                            <div key={i} className="text-black text-base font-bold text-Main100">
                                {leftstring[i] ?? ""}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3.5 items-start">
                        {Array.from({ length: rowCount }).map((_, i) => {
                            const value = rightstring[i] ?? ""
                            const isMissing = value.includes("없어요")
                            return (
                                <div
                                    key={i}
                                    className={`self-stretch ${
                                        isMissing
                                            ? "text-black opacity-20 text-xs font-medium"
                                            : "text-black text-sm font-light"
                                    }`}
                                >
                                    {value}
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col justify-between gap-1.5 items-start">
                        {Array.from({ length: rowCount }).map((_, i) => {
                            const url = linkurl[i]
                            return (
                                <div
                                    key={i}
                                    className="h-7 flex flex-col justify-center items-center"
                                >
                                    {url ? (
                                        <Link
                                            to={url}
                                            className="rounded-full p-2 flex justify-center items-center hover:no-underline"
                                        >
                                            <Icon name="arrowicon_line_right" size={12} />
                                        </Link>
                                    ) : (
                                        <div className="w-6 h-6" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : mode === "coupinfo" && requestList?.length ? (
                <div className="px-1 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="w-[110px] text-base text-black font-semibold">
                            요청 상세
                        </div>
                        <div className="flex-1 space-y-2.5">
                            {requestList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between text-sm font-light text-black"
                                >
                                    <span>{item.name}</span>
                                    <span>{item.count}EA</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 총 금액 */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="w-[110px] text-base text-black font-semibold">총 금액</div>
                        <div className="flex-1 text-sm text-black font-light">
                            {rightstring?.[0] ?? ""}
                        </div>
                    </div>

                    {/* 승인 일시 */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="w-[110px] text-base text-black font-semibold">
                            승인 일시
                        </div>
                        <div className="flex-1 text-sm text-black font-light">
                            {rightstring?.[1] ?? ""}
                        </div>
                    </div>
                </div>
            ) : (
                // 기본 default 렌더링
                <div className="px-1 space-y-3">
                    {leftstring.map((left, index) => {
                        const right = rightstring?.[index] ?? ""
                        const url = linkurl?.[index] ?? ""
                        const onClick = onClicks?.[index]

                        return (
                            <div key={index} className="flex items-start justify-between gap-3">
                                <div className="w-[110px] text-base text-black font-semibold">
                                    {url ? (
                                        <Link to={url} className="hover:underline">
                                            {left}
                                        </Link>
                                    ) : onClick ? (
                                        <button
                                            type="button"
                                            className="bg-transparent border-none p-0 m-0 cursor-pointer hover:underline"
                                            onClick={onClick}
                                        >
                                            {left}
                                        </button>
                                    ) : (
                                        <span>{left}</span>
                                    )}
                                </div>

                                <div className="flex-1 text-sm text-black font-light">{right}</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DetailBox
