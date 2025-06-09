import React, { useEffect, useState } from "react"
import CommonButton from "../button/CommonButton.tsx"

type BasicModalProps = {
    mode: "YesNo" | "OnlyYes"
    isOpen: boolean
    title: string
    description?: string
    onClose?: () => void //돌아가기 버튼 핸들러
    onConfirm: () => void //확인 버튼 핸들러
} & React.HTMLAttributes<HTMLDivElement>

const BasicModal: React.FC<BasicModalProps> = ({
    mode,
    isOpen,
    title,
    description,
    onClose,
    onConfirm,
    ...props
}) => {
    const [visible, setVisible] = useState(isOpen)
    const [animation, setAnimation] = useState("animate-modalEnter")
    const [bgAnimation, setBgAnimation] = useState("animate-bgFadeIn")

    useEffect(() => {
        if (isOpen) {
            setVisible(true)
            setAnimation("animate-modalEnter")
            setBgAnimation("animate-bgFadeIn")
        } else {
            setAnimation("animate-modalExit")
            setBgAnimation("animate-bgFadeOut")
            const timer = setTimeout(() => setVisible(false), 400)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!visible) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" {...props}>
            <div className={`absolute inset-0 bg-black ${bgAnimation}`} />
            <div
                className={`bg-white rounded-xl p-6 w-80 shadow-custom-basic transform ${animation}`}
            >
                <h2 className="text-black text-base font-bold mb-2">{title}</h2>
                {description && <p className="text-sm text-black mb-2">{description}</p>}
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
                            detail={{ label: "돌아가기", position: "none" }}
                            onClick={onClose}
                        />
                    )}
                    <CommonButton
                        size="small"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{ label: "확인", position: "none" }}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    )
}

export default BasicModal
