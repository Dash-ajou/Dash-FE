import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import Layout from "../../components/layout/Layout.tsx"
import DetailBox from "../../components/common/DetailBox.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { couponRequest } from "../../services/vendorCouponRequestService.ts"

const CouponRequestConfirm: React.FC = () => {
    const location = useLocation()
    const { vendor, request } = location.state

    const [showResultModal, setShowResultModal] = useState(false)
    const [showFailResultModal, setShowFailResultModal] = useState<boolean>(false)
    const [requestId, setRequestId] = useState(-1)

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const requestPayload = {
                vendor: {
                    vendor_name: vendor.organizationName,
                    president_name: vendor.representativeName,
                    president_phone: vendor.contact,
                },
                partner: {
                    business_name: request.partnerName,
                    owner_phone: request.partnerPhone,
                },
                products: request.menu.map((item: { menuName: number; quantity: number }) => ({
                    product_name: item.menuName,
                    count: item.quantity,
                    is_new: true,
                })),
            }

            const response = await couponRequest(requestPayload)

            if (response.success) {
                setShowResultModal(true)
                setRequestId(response.request_id)
            } else {
                setShowFailResultModal(true)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setShowFailResultModal(true)
        }
    }

    const handleConfirm = () => {
        setShowResultModal(true)
        navigate("/user/coupon/request/detail", { state: requestId })
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <div className="text-black font-bold text-xl mt-8 mb-4 min-h-16">
                    요청주신 내용을 정리해봤어요
                    <br />한 번 더 확인 후 요청서를 발행해주세요
                </div>

                <DetailBox
                    mode={"default"}
                    title={"벤더 정보"}
                    leftstring={["발행 단체명", "대표자 명", "대표자 연락처"]}
                    rightstring={[
                        vendor.organizationName,
                        vendor.representativeName,
                        vendor.contact,
                    ]}
                />

                <DetailBox
                    mode={"default"}
                    title={"요청 상세"}
                    leftstring={[
                        "파트너 명",
                        "연락처",
                        "메뉴명",
                        ...Array(request.menu.length - 1).fill(""),
                    ]}
                    rightstring={[
                        request.partnerName,
                        request.partnerPhone,
                        ...request.menu.map(
                            (item: { menuName: string; quantity: string }) =>
                                `${item.menuName} ${item.quantity}EA`
                        ),
                    ]}
                />

                <div className="flex justify-center mt-6">
                    <CommonButton
                        size="normal"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{
                            label: "요청서 발행",
                            position: "right",
                            icon: "arrowicon_line_right_white",
                        }}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

            <BasicModal
                mode={"YesNo"}
                isOpen={showResultModal}
                title={"요청서 발행에 성공했습니다."}
                onClose={() => navigate("/user/main")}
                onConfirm={handleConfirm}
            />

            <BasicModal
                mode={"OnlyYes"}
                isOpen={showFailResultModal}
                title={"요청서 발행 중 오류가 발생했습니다."}
                onConfirm={() => setShowFailResultModal(false)}
            />
        </Layout>
    )
}

export default CouponRequestConfirm
