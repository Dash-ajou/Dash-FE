import React, { useCallback, useEffect, useState } from "react"
import InputField from "../../common/InputField.tsx"
import CommonButton from "../../common/button/CommonButton.tsx"
import { RequestDetail } from "../../../types/CouponRequestTypes.ts"
import BasicModal from "../../common/modal/BasicModal.tsx"
import { SearchItem, SearchPartner } from "../../../services/vendorCouponRequestService.ts"

type RequestDetailFormProps = {
    requestDetail: RequestDetail
    setRequestDetail: (info: RequestDetail) => void
    onPrev: () => void
    setShouldProceedNext: (data: boolean) => void
}

type partnerType = {
    partner_id: number
    partner_name: string
    owner_phone: string
}

type productType = {
    product_id: number
    product_name: string
}

const RequestDetailForm: React.FC<RequestDetailFormProps> = ({
    requestDetail,
    setRequestDetail,
    onPrev,
    setShouldProceedNext,
}) => {
    const [localRequestDetail, setLocalRequestDetail] = useState<RequestDetail>({
        ...requestDetail,
        menu:
            requestDetail.menu.length > 0
                ? requestDetail.menu
                : [
                      {
                          menuName: "",
                          menuId: undefined,
                          quantity: "",
                          is_new: true,
                      },
                  ],
    })
    const [isButtonActive, setIsButtonActive] = useState(false)
    const [showQuantityErrorModal, setShowQuantityErrorModal] = useState(false)
    const [partnerId, setPartnerId] = useState<number>(-1)
    const [isPartnerPhoneDisabled, setIsPartnerPhoneDisabled] = useState(false)

    const checkAllFieldsFilled = useCallback(() => {
        const isValid =
            localRequestDetail.storeName.trim() !== "" &&
            localRequestDetail.partnerPhone.trim() !== "" &&
            localRequestDetail.menu.every(
                (item) => item.menuName.trim() !== "" && item.quantity.trim() !== ""
            )

        setIsButtonActive(isValid)
    }, [localRequestDetail])

    useEffect(() => {
        checkAllFieldsFilled()
    }, [localRequestDetail])

    const handleMenuChange = (index: number, field: "menuName" | "quantity", value: string) => {
        const updatedMenu = [...localRequestDetail.menu]
        updatedMenu[index][field] = value
        if (field === "menuName") {
            updatedMenu[index].is_new = true
            updatedMenu[index].menuId = undefined
        }
        setLocalRequestDetail({ ...localRequestDetail, menu: updatedMenu })
    }

    const addMenu = () => {
        setLocalRequestDetail({
            ...localRequestDetail,
            menu: [
                ...localRequestDetail.menu,
                { menuName: "", menuId: undefined, quantity: "", is_new: true },
            ],
        })
    }

    const removeMenu = (index: number) => {
        const updatedMenu = localRequestDetail.menu.filter((_, i) => i !== index)
        setLocalRequestDetail({ ...localRequestDetail, menu: updatedMenu })
    }

    const handleChange = (field: keyof RequestDetail, value: string) => {
        if (localRequestDetail[field] !== value) {
            const updatedInfo = { ...localRequestDetail, [field]: value }
            setLocalRequestDetail(updatedInfo)

            if (field === "storeName") {
                setIsPartnerPhoneDisabled(false)
                setLocalRequestDetail({ ...updatedInfo, partnerPhone: "" })
            }
        }
    }

    const handleSave = useCallback(
        (direction: "prev" | "next") => {
            const isValidQuantity = localRequestDetail.menu.every((item) => {
                const trimmed = item.quantity.trim()
                if (direction === "prev") {
                    return trimmed === "" || /^\d+$/.test(trimmed)
                } else {
                    return /^\d+$/.test(trimmed)
                }
            })

            if (!isValidQuantity) {
                setShowQuantityErrorModal(true)
                return
            }

            setRequestDetail(localRequestDetail)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            direction === "next" ? setShouldProceedNext(true) : onPrev()
        },
        [localRequestDetail, setShouldProceedNext, onPrev]
    )

    const fetchSuggestions = async (query: string) => {
        if (!query.trim()) return []
        const response = await SearchPartner(query)
        if (response.success && Array.isArray(response.data)) {
            return response.data.map((item: partnerType) => ({
                id: item.partner_id,
                name: item.partner_name,
                phone: item.owner_phone,
            }))
        }
        return []
    }

    const fetchItemSuggestions = async (query: string) => {
        if (!query.trim()) return []
        const response = await SearchItem(query, partnerId)
        if (response.success && Array.isArray(response.data)) {
            return response.data.map((item: productType) => ({
                id: item.product_id,
                name: item.product_name,
                phone: "",
            }))
        }
        return []
    }

    const handleSelectSuggestion = (item: { id: number; name: string; phone: string }) => {
        setLocalRequestDetail({
            ...localRequestDetail,
            storeName: item.name,
            partnerPhone: item.phone,
        })
        setPartnerId(item.id)
        setIsPartnerPhoneDisabled(true)
    }

    const handleItemSelectSuggestion = (index: number, item: { id: number; name: string }) => {
        const updatedMenu = [...localRequestDetail.menu]
        updatedMenu[index] = {
            ...updatedMenu[index],
            menuName: item.name,
            menuId: item.id,
            is_new: false,
        }
        setLocalRequestDetail({ ...localRequestDetail, menu: updatedMenu })
    }

    return (
        <div className="flex flex-col gap-4">
            <InputField
                label="파트너(업체명/가게명)"
                dropdown={true}
                value={localRequestDetail.storeName}
                onInput={(e) => handleChange("storeName", e.currentTarget.value)}
                fetchSuggestions={fetchSuggestions}
                onSelectSuggestion={handleSelectSuggestion}
            />

            <InputField
                label="파트너 대표자 연락처"
                dropdown={false}
                value={localRequestDetail.partnerPhone}
                onInput={(e) => handleChange("partnerPhone", e.currentTarget.value)}
                disabled={isPartnerPhoneDisabled}
            />

            {localRequestDetail.menu.map((item, index) => (
                <div key={index} className="flex gap-1 items-end">
                    <div className="flex-[4]">
                        <InputField
                            label="요청 상세 (메뉴명)"
                            dropdown={true}
                            value={item.menuName}
                            onInput={(e) =>
                                handleMenuChange(index, "menuName", e.currentTarget.value)
                            }
                            fetchSuggestions={fetchItemSuggestions}
                            onSelectSuggestion={(item) => handleItemSelectSuggestion(index, item)}
                        />
                    </div>
                    <div className="flex-[1]">
                        <InputField
                            label="수량"
                            dropdown={false}
                            value={item.quantity}
                            onInput={(e) =>
                                handleMenuChange(index, "quantity", e.currentTarget.value)
                            }
                        />
                    </div>
                    {localRequestDetail.menu.length > 1 && (
                        <CommonButton
                            size="mini"
                            isActive={true}
                            mode="textbold"
                            color="red"
                            detail={{ label: "−", position: "none" }}
                            onClick={() => removeMenu(index)}
                        />
                    )}
                </div>
            ))}
            <div className="flex w-full justify-end">
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="textbold"
                    color="blue"
                    detail={{ label: "+ 메뉴 추가", position: "none" }}
                    onClick={addMenu}
                />
            </div>

            <div className="flex gap-4">
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="fill"
                    color="blue"
                    detail={{ label: "이전", position: "left", icon: "arrowicon_line_left_white" }}
                    onClick={() => handleSave("prev")}
                />
                {isButtonActive ? (
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{
                            label: "다음",
                            position: "right",
                            icon: "arrowicon_line_right_white",
                        }}
                        onClick={() => handleSave("next")}
                    />
                ) : (
                    <div className="flex-1"></div>
                )}
            </div>

            <BasicModal
                mode={"OnlyYes"}
                isOpen={showQuantityErrorModal}
                title={"수량 필드에는 숫자만 입력해주세요"}
                onConfirm={() => setShowQuantityErrorModal(false)}
            />
        </div>
    )
}

export default RequestDetailForm
