import React, {useEffect, useState} from "react";

type SlideUpModalProps = {
    isOpen: boolean;
    isFixed?: boolean;
    height: "long" | "auto";
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const SlideUpModal: React.FC<SlideUpModalProps> = ({
                                                       isOpen,
                                                       isFixed,
                                                       height,
                                                       title,
                                                       children,
                                                       onClose,
                                                       ...props
                                                   }) => {
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => {
                setVisible(true);
                setExpanded(false);
            }, 10);
        } else {
            setVisible(false);
            setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    const modalHeightClass = isFixed
        ? expanded
            ? height === "long"
                ? "h-[70%]"
                : "min-h-fit max-h-[80vh]"
            : "h-[100px]"
        : height === "long"
            ? "h-[70%]"
            : "min-h-fit max-h-[80vh]";

    const handleClose = () => {
        if (isFixed) {
            setExpanded(false);
        } else {
            setVisible(false);
            onClose?.();
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-end justify-center bg-black transition-opacity duration-300 ${
                isFixed ? (expanded ? "bg-opacity-50" : "bg-opacity-0") : (visible ? "bg-opacity-50" : "bg-opacity-0")
            } z-50`}
            onClick={handleClose}
            {...props}
        >
            <div
                className={`w-[100%] max-w-[450px] bg-white rounded-t-xl shadow-custom-basic transition-all duration-300 
                ${modalHeightClass} 
                ${visible ? "translate-y-0" : "translate-y-full"}`}
                onClick={(e) => {
                    e.stopPropagation()
                    if (isFixed) setExpanded(true)
                }}
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
