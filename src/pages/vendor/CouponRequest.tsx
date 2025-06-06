import React, { useEffect, useState } from "react"
import CouponTabs from "../../components/unit/user-coupon-request/CouponTabs.tsx"
import VendorInfoForm from "../../components/unit/user-coupon-request/VendorInfoForm.tsx"
import RequestDetailForm from "../../components/unit/user-coupon-request/RequestDetailForm.tsx"
import Layout from "../../components/layout/Layout.tsx"
import { VendorInfo, RequestDetail } from "../../types/CouponRequestTypes.ts"
import { useNavigate } from "react-router-dom"

const CouponRequest: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0) // 0: 벤더정보, 1: 요청상세
    const [isVendorInfoCompleted, setIsVendorInfoCompleted] = useState(false)
    const [shouldProceedNext, setShouldProceedNext] = useState(false)

    const navigate = useNavigate()

    const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
        organizationName: "",
        representativeName: "",
        representativeContact: "",
    })

    const [requestDetail, setRequestDetail] = useState<RequestDetail>({
        storeName: "",
        partnerPhone: "",
        menu: [{ menuName: "", menuId: undefined, quantity: "", is_new: true }],
    })

    useEffect(() => {
        if (shouldProceedNext) {
            handleNext()
            setShouldProceedNext(false)
        }
    }, [requestDetail])

    const handleTabChange = (tab: number) => {
        setActiveTab(tab)
    }

    const handleNext = () => {
        navigate("/user/coupon/request/confirm", {
            state: {
                vendor: {
                    organizationName: vendorInfo.organizationName,
                    representativeName: vendorInfo.representativeName,
                    contact: vendorInfo.representativeContact,
                },
                request: {
                    partnerName: requestDetail.storeName,
                    partnerPhone: requestDetail.partnerPhone,
                    menu: [...requestDetail.menu],
                },
            },
        })
    }

    return (
        <Layout>
            <div className="text-black font-bold text-xl mt-8 mb-4 min-h-16">
                {activeTab === 0
                    ? "쿠폰 발행을 요청하는 벤더 정보를 기입해주세요"
                    : "쿠폰 발행을 요청하는 파트너 정보와 요청 메뉴 상세 정보를 기입해주세요"}
            </div>

            <CouponTabs
                tabs={[{ label: "벤더 정보" }, { label: "요청 상세" }]}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                completedTabs={isVendorInfoCompleted ? [0] : []}
            />

            {activeTab === 0 && (
                <VendorInfoForm
                    vendorInfo={vendorInfo}
                    setVendorInfo={setVendorInfo}
                    onNext={() => {
                        setIsVendorInfoCompleted(true)
                        setActiveTab(1)
                    }}
                />
            )}

            {activeTab === 1 && (
                <RequestDetailForm
                    requestDetail={requestDetail}
                    setRequestDetail={setRequestDetail}
                    onPrev={() => setActiveTab(0)}
                    setShouldProceedNext={setShouldProceedNext}
                />
            )}
        </Layout>
    )
}

export default CouponRequest
