import React, {useEffect, useState} from "react";

type SlideUpModalProps = {
    isOpen: boolean;
    height: "long" | "short";
    title?: string;
    children?: React.ReactNode;
    onClose: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const SlideUpModal: React.FC<SlideUpModalProps> = ({
                                                       isOpen,
                                                       height,
                                                       title,
                                                       children,
                                                       onClose,
                                                       ...props
                                                   }) => {
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setVisible(true), 10);
        } else {
            setVisible(false);
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 flex items-end justify-center bg-black transition-opacity duration-300 ${
                visible ? "bg-opacity-50" : "bg-opacity-0"
            } z-50`}
            onClick={onClose}
            {...props}
        >
            <div
                className={`w-[100%] max-w-[450px] min-w-[350px] bg-white rounded-t-xl shadow-custom-basic transition-transform duration-300 
                ${height === "long" ? "h-[70%]" : "h-[40%]"} 
                ${visible ? "translate-y-0" : "translate-y-full"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 드래그 핸들 */}
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>

                {/* 타이틀 */}
                {title && <h2 className="text-black text-lg font-bold text-center mt-4">{title}</h2>}

                {/* 컨텐츠 */}
                <div className="flex flex-col px-6 py-4">{children}</div>
            </div>
        </div>
    )
};

export default SlideUpModal;
