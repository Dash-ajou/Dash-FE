import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import DetailBox from "../../components/common/DetailBox.tsx"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { couponRequestDetail, RequestDelete } from "../../services/vendorCouponRequestService.ts"
import { useLocation, useNavigate } from "react-router-dom"
import Icon from "../../components/common/icons/Icon.tsx"
import iconRegistry from "../../components/common/icons/IconRegistry.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"

type ItemStatus = {
    icon: keyof typeof iconRegistry
    message: string
}

const CouponRequestDetail: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const requestId = location.state
    const [data, setData] = useState<any>(null)
    const [deleteButton, setDeleteButton] = useState<boolean>(true)
    const [itemStatus, setItemStatus] = useState<ItemStatus>({
        icon: "pendingicon_fill",
        message: "",
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)

    const handleDelete = async (requestId: number) => {
        try {
            const response = await RequestDelete(requestId)
            if (response.success) {
                navigate("/user/coupon/request/list")
            } else {
                alert("요청 철회에 실패했습니다.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await couponRequestDetail(Number(requestId))
                if (response.success) {
                    setData(response.data)
                    setItemStatus(getItemStatus(response.data.status))
                    if (response.data.status !== "REQUESTED") {
                        setDeleteButton(false)
                    }
                } else {
                    setError("데이터를 불러오는 데 실패했습니다.")
                }
            } catch (error) {
                setError("데이터를 불러오는 중 오류가 발생했습니다." + error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [requestId])

    const getItemStatus = (status: string): ItemStatus => {
        switch (status) {
            case "REQUESTED":
                return {
                    icon: "pendingicon_fill",
                    message: "승인 대기 중입니다",
                }
            case "APPROVED":
                return {
                    icon: "checkicon_fill_black",
                    message: "승인 완료되었습니다",
                }
            case "DENIED":
                return {
                    icon: "noticeicon_fill",
                    message: "승인 반려되었습니다",
                }
            default:
                return {
                    icon: "noticeicon_fill",
                    message: "알 수 없는 상태",
                }
        }
    }

    if ((loading && !data) || !data.products) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6  mt-4">
                <DetailBox
                    mode={"default"}
                    title={"벤더 정보"}
                    leftstring={["발행 단체명", "대표자 명", "연락처", "작성 일시"]}
                    rightstring={[
                        data.vendor.vendor_name,
                        data.vendor.president_name,
                        data.vendor.president_phone,
                        data.created_at,
                    ]}
                />

                <DetailBox
                    mode={"default"}
                    title={"요청 상세"}
                    leftstring={[
                        "파트너 명",
                        "연락처",
                        "메뉴명",
                        ...Array(data?.products?.length - 1).fill(""),
                    ]}
                    rightstring={[
                        data.partner.business_name,
                        data.partner.owner_phone,
                        ...data.products.map(
                            (item: { productName: string; count: number }) =>
                                `${item.productName}  ${item.count}EA`
                        ),
                    ]}
                />

                <DetailBox
                    mode={"default"}
                    title={"진행 상태"}
                    leftstring={[<Icon name={itemStatus.icon} size={16} />]}
                    rightstring={[itemStatus.message]}
                />
                {deleteButton && (
                    <CommonButton
                        size="small"
                        isActive={true}
                        mode="text"
                        color="black"
                        detail={{ label: "요청 철회하기", position: "none" }}
                        onClick={() => setIsAlertModalOpen(true)}
                    />
                )}
            </div>

            <BasicModal
                mode={"YesNo"}
                isOpen={isAlertModalOpen}
                title={"요청을 철회하시나요?"}
                description={"요청을 철회하면 전달된 요청서도 함께 취소돼요"}
                onClose={() => setIsAlertModalOpen(false)}
                onConfirm={() => handleDelete(requestId)}
            />
        </Layout>
    )
}

export default CouponRequestDetail
