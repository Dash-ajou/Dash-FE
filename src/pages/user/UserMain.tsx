import { useState, useEffect } from "react"
import UserMainQRButton from "../../components/unit/user-main/UserMainQRButtons"
import UserMainButtons from "../../components/unit/user-main/UserMainButtons"
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
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import DashMap from "../../components/module/DashMap.tsx"

const formatDueDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().slice(0, 10)
}

const UserMain = () => {
    const [qrData, setQRData] = useState<QRData[]>([])
    const userName = useSelector((state: RootState) => state.user.name)
    const navigate = useNavigate()
    const [isDevNoticeModalOpen, setIsDevNoticeModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const getCouponList = async () => {
            const res = await fetchRegisteredCouponList()
            if (res.success && res.data) {
                const mappedData: QRData[] = res.data.map((item: RegisteredCouponItem) => ({
                    title: item.couponName,
                    partnername: item.partnerName,
                    duedate: formatDueDate(item.validUntil),
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

            <div className="mt-8">
                <h1 className="text-black text-xl font-semibold mb-4">지도로 보기</h1>
                <div
                    className="rounded-xl overflow-hidden"
                    onClick={() => setIsDevNoticeModalOpen(true)}
                >
                    <DashMap />
                </div>
            </div>

            <BasicModal
                mode={"OnlyYes"}
                isOpen={isDevNoticeModalOpen}
                title={"개발중입니다."}
                onConfirm={() => setIsDevNoticeModalOpen(false)}
            />
        </Layout>
    )
}

export default UserMain
