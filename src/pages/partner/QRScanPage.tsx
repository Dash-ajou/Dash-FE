import QRScan from "../../components/module/QRScan.tsx"
import SubHeader from "../../components/layout/SubHeader.tsx"
import React, { useState } from "react"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { useLocation, useNavigate } from "react-router-dom"
import { CouponRegister } from "../../services/userCoupManageService.ts"

const QRScanPage: React.FC = () => {
    const [alarmModalOpen, setAlarmModalOpen] = useState<boolean>(false)
    const [modalTitle, setModalTitle] = useState<string>("")
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
    const [lastCalled, setLastCalled] = useState<number>(0)

    const navigate = useNavigate()
    const location = useLocation()

    const isPartner = location.pathname.includes("/partner")

    const handleClick = (couponNum: string) => {
        const now = Date.now()
        if (now - lastCalled >= 3000) {
            setLastCalled(now)

            if (isPartner) {
                navigate(`/partner/coupon/status/${couponNum}`)
            } else {
                handleCouponRegister(couponNum)
            }
        }
    }

    const handleCouponRegister = async (couponNum: string) => {
        try {
            const result = await CouponRegister({ coupon_number: couponNum })

            if (result.success) {
                setModalTitle("등록이 완료되었습니다")
                setIsSuccess(true)
            } else {
                setModalTitle("등록에 실패했습니다. 다시 시도해주세요.")
                setIsSuccess(false)
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setModalTitle("알 수 없는 오류가 발생했습니다.")
            setIsSuccess(false)
        } finally {
            setAlarmModalOpen(true)
        }
    }

    const handleConfirm = () => {
        if (isSuccess) {
            navigate("/user/main")
        } else {
            setAlarmModalOpen(false)
        }
    }

    return (
        <div className="overflow-hidden overscroll-none h-[100dvh]">
            <div className="relative z-10">
                <SubHeader />
            </div>
            <div className="relative z-0 h-[100dvh] ">
                <QRScan isPartner={isPartner} onClick={(couponNum) => handleClick(couponNum)} />
            </div>

            <BasicModal
                mode={"OnlyYes"}
                isOpen={alarmModalOpen}
                title={modalTitle}
                onConfirm={handleConfirm}
            />
        </div>
    )
}

export default QRScanPage
