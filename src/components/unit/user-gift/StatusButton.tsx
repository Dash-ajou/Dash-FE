import React, {HTMLAttributes} from "react";

type StatusButtonProps = {
    label: string;
    available: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const StatusButton: React.FC<StatusButtonProps> = ({
                                                       label,
                                                       available,
                                                       ...props
                                                   }) => {
    const availableStyles = available
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : "cursor-not-allowed bg-blue-150 text-white hover:bg-none";

    return (
        <button
            className={`inline-block px-5 py-2 text-base font-bold rounded-full w-fit shrink-0 grow-0 h-fit ${availableStyles}`}
            {...props}>
            {label}
        </button>
    )
};

export default StatusButton;
