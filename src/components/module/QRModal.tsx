import React, { useState, useEffect, useRef } from "react"
import CommonButton from "../common/button/CommonButton"
import BasicModal from "../common/modal/BasicModal.tsx"
import { DeleteCoupon } from "../../services/userCoupManageService.ts"
import { useNavigate } from "react-router-dom"

type QRModalProps = {
    title: string
    qrimg: string
    coupnum: string
    storename: string
    duedate: string
    couponId: number
    onClose: () => void
}

const QRModal: React.FC<QRModalProps> = ({
    title,
    qrimg,
    coupnum,
    storename,
    duedate,
    couponId,
    onClose,
}) => {
    const navigate = useNavigate()
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false)
    const [isDevNoticeModalOpen, setIsDevNoticeModalOpen] = useState<boolean>(false)

    const [timeLeft, setTimeLeft] = useState<number>(60)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(timerRef.current!)
        }
    }, [])

    const handleDelete = async () => {
        try {
            const response = await DeleteCoupon(couponId)
            if (response.success) {
                navigate("/user/main")
            } else {
                alert("쿠폰 삭제에 실패했습니다.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="flex flex-col w-80 p-8 bg-white rounded-xl shadow-custom-basic justify-between items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex flex-col mb-8 items-start">
                    <h1 className="text-black text-xl font-bold leading-normal">{title}</h1>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 flex-grow">
                    <div className="w-[170px] h-[170px] bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center">
                        {qrimg ? (
                            <img
                                src={qrimg}
                                alt="QR Code"
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            <div className="text-gray-500">QR 이미지 없음</div>
                        )}
                    </div>
                    <p className="text-black text-sm font-normal tracking-widest text-center ">
                        {coupnum}
                    </p>

                    <div className="w-full flex flex-col items-center gap-2">
                        <div className="text-black text-base font-semibold">{timeLeft}초 남음</div>
                        <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden mb-8">
                            <div className="bg-blue-500 h-full animate-shrink60"></div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-4 items-start">
                    <p className="text-black text-base font-bold opacity-60 leading-normal mb-3">
                        {storename}
                        <br />
                        유효기간 ~{duedate}
                    </p>
                    <div className="flex w-full items-center gap-2">
                        <CommonButton
                            size="small"
                            isActive={true}
                            mode="fill"
                            color="blue"
                            detail={{
                                label: "쿠폰 선물하기",
                                position: "none",
                            }}
                            onClick={() => setIsDevNoticeModalOpen(true)}
                        />
                        <CommonButton
                            size="small"
                            isActive={true}
                            mode="line"
                            color="blue"
                            detail={{
                                label: "쿠폰 삭제하기",
                                position: "none",
                            }}
                            onClick={() => setIsCancelModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <BasicModal
                mode={"YesNo"}
                isOpen={isCancelModalOpen}
                title={"쿠폰을 삭제하시나요?"}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleDelete}
            />

            <BasicModal
                mode={"OnlyYes"}
                isOpen={isDevNoticeModalOpen}
                title={"개발중입니다."}
                onConfirm={() => setIsDevNoticeModalOpen(false)}
            />
        </div>
    )
}

export default QRModal
