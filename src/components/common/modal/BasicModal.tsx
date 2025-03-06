import React from "react";
import CommonButton from "../button/CommonButton.tsx";

type BasicModalProps = {
    mode: "YesNo" | "OnlyYes";
    isOpen: boolean;
    title: string;
    description?: string;
    onClose?: () => void; //돌아가기 버튼 핸들러
    onConfirm: () => void; //확인 버튼 핸들러
} & React.HTMLAttributes<HTMLDivElement>;

const BasicModal: React.FC<BasicModalProps> = ({
                                                   mode,
                                                   isOpen,
                                                   title,
                                                   description,
                                                   onClose,
                                                   onConfirm,
                                                   ...props
                                               }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
            {...props}
        >
            <div className="bg-white rounded-xl p-6 w-80 shadow-custom-basic">
                <h2 className="text-black text-base font-bold mb-2">{title}</h2>
                {description && (
                    <p className="text-sm text-black mb-2">{description}</p>
                )}
                <div
                    className={`flex gap-4 mt-4 ${
                        mode === "YesNo" ? "justify-between" : "justify-center"
                    }`}
                >
                    {mode === "YesNo" && (
                        <CommonButton
                            size="small"
                            isActive={true}
                            mode="fill"
                            color="gray"
                            detail={{label: "돌아가기", position: "none"}}
                            onClick={onClose}
                        />
                    )}
                    <CommonButton
                        size="small"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "확인", position: "none"}}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    )
};

export default BasicModal;
