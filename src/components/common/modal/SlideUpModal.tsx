import React, { useEffect, useState } from "react"

type SlideUpModalProps = {
    isOpen: boolean
    isFixed?: boolean
    height: "long" | "auto"
    title?: string
    children?: React.ReactNode
    onClose?: () => void
} & React.HTMLAttributes<HTMLDivElement>

const SlideUpModal: React.FC<SlideUpModalProps> = ({
    isOpen,
    isFixed,
    height,
    title,
    children,
    onClose,
    ...props
}) => {
    const [visible, setVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(isOpen)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    // Touch gesture state for swipe up/down
    const [touchStartY, setTouchStartY] = useState<number | null>(null)
    const [currentTranslateY, setCurrentTranslateY] = useState<number>(0)

    // Track screen height for modal positioning
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight)
    useEffect(() => {
        const handleResize = () => setScreenHeight(window.innerHeight)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartY !== null) {
            const moveY = e.touches[0].clientY
            const diff = moveY - touchStartY
            setCurrentTranslateY(diff)
        }
    }

    const handleTouchEnd = () => {
        if (currentTranslateY > 100) {
            setExpanded(false)
        } else if (currentTranslateY < -100) {
            setExpanded(true)
        }
        setTouchStartY(null)
        setCurrentTranslateY(0)
    }

    useEffect(() => {
        const initialHeight = window.innerHeight

        const handleResize = () => {
            const threshold = initialHeight * 0.7
            if (window.innerHeight < threshold) {
                setIsKeyboardOpen(true)
            } else {
                setIsKeyboardOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true)
            setTimeout(() => {
                setVisible(true)
                setExpanded(false)
            }, 10)
        } else {
            setVisible(false)
        }
    }, [isOpen])

    if (!shouldRender) return null

    const handleClose = () => {
        if (isFixed) {
            if (expanded) {
                setExpanded(false)
            }
        } else {
            setVisible(false)
            onClose?.()
        }
    }

    const basePosition = expanded ? screenHeight * 0.3 : screenHeight - 100

    return (
        <div
            className={`fixed inset-0 flex items-end justify-center bg-black transition-opacity duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isFixed
                    ? expanded || isKeyboardOpen
                        ? "bg-opacity-50"
                        : "bg-opacity-0"
                    : visible
                      ? "bg-opacity-50"
                      : "bg-opacity-0"
            } z-50`}
            onClick={handleClose}
            {...props}
        >
            <div
                onTouchStart={isFixed ? handleTouchStart : undefined}
                onTouchMove={isFixed ? handleTouchMove : undefined}
                onTouchEnd={isFixed ? handleTouchEnd : undefined}
                className={`w-[100%] max-w-[450px] ${
                    isFixed ? "h-[100vh]" : height === "long" ? "h-[70%]" : "h-auto"
                } bg-white rounded-t-xl overflow-hidden shadow-custom-basic transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    transform: isFixed
                        ? touchStartY !== null
                            ? `translateY(${basePosition + currentTranslateY}px)` // 드래그 중
                            : `translateY(${expanded ? screenHeight * 0.3 : screenHeight - 100}px)` // 스냅
                        : visible
                          ? "translateY(0%)"
                          : "translateY(100%)",
                    transition: isFixed
                        ? touchStartY !== null
                            ? "none"
                            : "transform 0.5s cubic-bezier(0.33,1,0.68,1)"
                        : visible
                          ? "transform 0.5s cubic-bezier(0.33,1,0.68,1)"
                          : "transform 0.5s cubic-bezier(0.33,1,0.68,1)",
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    if (isFixed) setExpanded(true)
                }}
                onTransitionEnd={() => {
                    if (!visible) {
                        setShouldRender(false)
                    }
                }}
            >
                {/* 드래그 핸들 */}
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>

                {/* 타이틀 */}
                {title && (
                    <h2 className="text-black text-lg font-bold text-center mt-4">{title}</h2>
                )}

                {/* 컨텐츠 */}
                <div className="flex flex-col px-6 py-4">{children}</div>
            </div>
        </div>
    )
}

export default SlideUpModal
