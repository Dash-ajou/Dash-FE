import { useState, useEffect } from "react"
import UserMainQRButton from "../../components/unit/user-main/UserMainQRButtons"
import UserMainButtons from "../../components/unit/user-main/UserMainButtons"
import BasicModal from "../../components/common/modal/BasicModal"
import QRModal from "../../components/module/QRModal"
import Layout from "../../components/layout/Layout"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { useNavigate } from "react-router-dom"
import {
    fetchRegisteredCouponList,
    RegisteredCouponItem,
} from "../../services/userCouponListService.ts"
import { QRData } from "../../types/QRData.ts"

const UserMain = () => {
    const [qrData, setQRData] = useState<QRData[]>([])
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false)
    const [isQRModalOpen, setIsQRModalOpen] = useState(false)
    const userName = useSelector((state: RootState) => state.user.name)
    const navigate = useNavigate()

    const handleConfirm = () => {
        setIsBasicModalOpen(false)
        setIsQRModalOpen(true)
    }

    const handleCloseQRModal = () => {
        setIsQRModalOpen(false)
    }

    useEffect(() => {
        const getCouponList = async () => {
            const res = await fetchRegisteredCouponList()
            if (res.success && res.data) {
                const mappedData: QRData[] = res.data.map((item: RegisteredCouponItem) => ({
                    title: item.couponName,
                    partnername: item.partnerName,
                    duedate: item.validUntil,
                    qrimg: "none",
                    couponId: item.couponId,
                }))
                setQRData(mappedData)
            }
        }
        getCouponList()
    }, [])

    return (
        <Layout>
            <div className="mt-9 mb-7">
                <h1 className="text-black text-xl font-semibold">{userName}님의 쿠폰</h1>
            </div>
            <div>
                {qrData.length === 0 ? (
                    <div className="px-2 py-3 justify-center bg-white rounded-xl border border-gray-200">
                        <div className="text-start text-black font-base text-base ">
                            등록된 쿠폰이 없어요. 쿠폰을 등록할까요?
                        </div>
                        <div className="">
                            <CommonButton
                                size="small"
                                isActive={true}
                                mode="text"
                                color="blue"
                                detail={{ label: "등록하기", position: "none" }}
                                onClick={() => navigate("/user/coupon/register")}
                            />
                        </div>
                    </div>
                ) : (
                    <UserMainQRButton qrData={qrData} />
                )}
            </div>
            <div className="mt-6">
                <UserMainButtons />
            </div>
            <BasicModal
                mode="YesNo"
                isOpen={isBasicModalOpen}
                title="쿠폰을 사용하시나요?"
                onClose={() => setIsBasicModalOpen(false)}
                onConfirm={handleConfirm}
            />
            {isQRModalOpen && (
                <div
                    className="fixed inset=0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleCloseQRModal}
                >
                    <QRModal
                        title="가나다라"
                        qrimg="none"
                        coupnum="1234-567-81"
                        storename="상점 이름"
                        duedate="2025-12-31"
                        onClose={handleCloseQRModal}
                    />
                </div>
            )}
        </Layout>
    )
}

export default UserMain
