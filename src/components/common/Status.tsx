import React, {HTMLAttributes, useEffect, useState} from 'react';

type ActivationStatus = "paused" | "active";
type UsageStatus = "used" | "unused";
type ApprovalStatus = "approved" | "rejected" | "pending";
type CertificationStatus = "verify";
type TimeStatus = "time";

type StatusType =
    | ActivationStatus
    | UsageStatus
    | ApprovalStatus
    | CertificationStatus
    | TimeStatus;

type StatusProps = {
    statusType: StatusType;
    color: "blue" | "red" | "gray" | "green" | "button" | "timer";
    onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const statusTextMap: { [key in Exclude<StatusType, "time">]: string } = {
    paused: "일시 중지",
    active: "활성화",
    used: "사용 완료된 쿠폰",
    unused: "미사용 쿠폰",
    approved: "승인",
    rejected: "반려",
    pending: "대기 중",
    verify: "인증하기",
};

const colorStyles = {
    blue: "text-white bg-blue-500",
    red: "text-white bg-red-500",
    gray: "text-black bg-gray-300",
    green: "text-white bg-green-500",
    button: "text-black bg-blue-50 hover:bg-blue-100",
    timer: "text-black bg-blue-50",
};

const Status: React.FC<StatusProps> = ({statusType, color, onClick, ...props}) => {
    const [time, setTime] = useState<number>(300);
    const [isVerifyClicked, setIsVerifyClicked] = useState<boolean>(false);

    useEffect(() => {
        if (statusType !== "time") return;

        const timer = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [statusType]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    if (statusType === "verify") {
        return (
            <div
                className={`h-fit inline-block px-4 py-2 text-base rounded-full whitespace-nowrap ${colorStyles["button"]}`}
                onClick={() => {
                    setIsVerifyClicked(true);
                    onClick?.();
                }}
                {...props}
            >
                {isVerifyClicked ? "재인증하기" : "인증하기"}
            </div>
        );
    }

    if (statusType === "time") {
        return (
            <div
                className={`h-fit w-24 text-center inline-block px-4 py-2 text-base rounded-full whitespace-nowrap ${colorStyles["timer"]}`}
                {...props}
            >
                {formatTime(time)}
            </div>
        );
    }

    return (
        <div
            className={`h-fit inline-block px-3 py-1 text-base font-bold rounded-full w-fit shrink-0 grow-0 whitespace-nowrap ${colorStyles[color]}`}
            {...props}>
            {statusTextMap[statusType]}
        </div>
    )
};

export default Status;
