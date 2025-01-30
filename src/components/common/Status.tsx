import React, {HTMLAttributes} from 'react';

type ActivationStatus = "paused" | "active";
type UsageStatus = "used" | "unused";
type ApprovalStatus = "approved" | "rejected" | "pending";
type CertificationStatus = "verify";

type StatusType =
    | ActivationStatus
    | UsageStatus
    | ApprovalStatus
    | CertificationStatus;

type StatusProps = {
    statusType: StatusType;
    color: "blue" | "red" | "gray" | "green" | "button";
    onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const statusTextMap: { [key in StatusType]: string } = {
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
    gray: "text-black bg-gray-200",
    green: "text-white bg-green-500",
    button: "text-black bg-blue-50 hover:bg-blue-100"
};

const Status: React.FC<StatusProps> = ({statusType, color, onClick,  ...props}) => {
    if (statusType === "verify") {
        return (
            <div
                className={`inline-block px-4 py-2 text-base rounded-full ${colorStyles["button"]}`}
                onClick={onClick}
                {...props}
            >
                {statusTextMap[statusType]}
            </div>
        );
    }

    return (
        <div
            className={`inline-block px-3 py-1 text-base font-bold rounded-full w-fit shrink-0 grow-0 ${colorStyles[color]}`}
            {...props}>
            {statusTextMap[statusType]}
        </div>
    )
};

export default Status;
