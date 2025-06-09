import React, { useEffect, useState } from "react"
import CommonButton from "../button/CommonButton.tsx"

type BasicModalProps = {
    mode: "YesNo" | "OnlyYes" | "Review"
    isOpen: boolean
    title: string
    description?: string
    onClose?: () => void //돌아가기 버튼 핸들러
    onConfirm: () => void //확인 버튼 핸들러
    rating?: number
    onRatingChange?: (value: number) => void
} & React.HTMLAttributes<HTMLDivElement>

const BasicModal: React.FC<BasicModalProps> = ({
    mode,
    isOpen,
    title,
    description,
    onClose,
    onConfirm,
    rating,
    onRatingChange,
    ...props
}) => {
    const defaultRating = rating === undefined || rating === 0 ? 5 : rating
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
                {mode === "Review" && (
                    <div className="flex justify-center my-4 gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="relative w-6 h-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={
                                        defaultRating >= star
                                            ? "gold"
                                            : defaultRating >= star - 0.5
                                              ? "url(#half)"
                                              : "gray"
                                    }
                                    className="w-6 h-6"
                                >
                                    <defs>
                                        <linearGradient id="half">
                                            <stop offset="50%" stopColor="gold" />
                                            <stop offset="50%" stopColor="gray" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.179L12 18.896l-7.336 3.857 1.402-8.179L.132 9.21l8.2-1.192z" />
                                </svg>
                                <div
                                    className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
                                    onClick={() => onRatingChange?.(star - 0.5)}
                                />
                                <div
                                    className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
                                    onClick={() => onRatingChange?.(star)}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div
                    className={`flex gap-4 mt-4 ${
                        mode === "YesNo" ? "justify-between" : "justify-center"
                    }`}
                >
                    {mode === "YesNo" ||
                        (mode === "Review" && (
                            <CommonButton
                                size="small"
                                isActive={true}
                                mode="fill"
                                color="gray"
                                detail={{ label: "돌아가기", position: "none" }}
                                onClick={onClose}
                            />
                        ))}
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
