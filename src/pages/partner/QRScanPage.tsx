import QRScan from "../../components/module/QRScan.tsx"
import SubHeader from "../../components/layout/SubHeader.tsx"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const QRScanPage: React.FC = () => {
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
                navigate(`/user/coupon/register/${couponNum}`)
            }
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
        </div>
    )
}

export default QRScanPage
