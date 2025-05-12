import React, {useCallback, useEffect, useState} from 'react';
import InputField from "../../common/InputField.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";
import {RequestDetail} from "../../../types/CouponRequestTypes.ts";
import BasicModal from "../../common/modal/BasicModal.tsx";

type RequestDetailFormProps = {
    requestDetail: RequestDetail;
    setRequestDetail: (info: RequestDetail) => void;
    onPrev: () => void;
    setShouldProceedNext: (data: boolean) => void;
}

const RequestDetailForm: React.FC<RequestDetailFormProps> = ({requestDetail, setRequestDetail, onPrev, setShouldProceedNext}) => {
    const [localRequestDetail, setLocalRequestDetail] = useState<RequestDetail>({
        ...requestDetail,
        menu: requestDetail.menu.length > 0 ? requestDetail.menu : [{menuName: "", quantity: ""}]
    });
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showQuantityErrorModal, setShowQuantityErrorModal] = useState(false);

    const checkAllFieldsFilled = useCallback(() => {
        const isValid =
            localRequestDetail.storeName.trim() !== "" &&
            localRequestDetail.partnerPhone.trim() !== "" &&
            localRequestDetail.menu.every(item => item.menuName.trim() !== "" && item.quantity.trim() !== "");

        setIsButtonActive(isValid);
    }, [localRequestDetail]);

    useEffect(() => {
        checkAllFieldsFilled();
    }, [localRequestDetail]);

    const handleMenuChange = (index: number, field: "menuName" | "quantity", value: string) => {
        const updatedMenu = [...localRequestDetail.menu];
        updatedMenu[index][field] = value;
        setLocalRequestDetail({...localRequestDetail, menu: updatedMenu});
    };

    const addMenu = () => {
        setLocalRequestDetail({
            ...localRequestDetail,
            menu: [...localRequestDetail.menu, {menuName: "", quantity: ""}]
        });
    };

    const removeMenu = (index: number) => {
        const updatedMenu = localRequestDetail.menu.filter((_, i) => i !== index);
        setLocalRequestDetail({...localRequestDetail, menu: updatedMenu});
    };

    const handleChange = (field: keyof RequestDetail, value: string) => {
        if (localRequestDetail[field] !== value) {
            const updatedInfo = {...localRequestDetail, [field]: value};
            setLocalRequestDetail(updatedInfo);
        }
    };

    const handleSave = useCallback((direction: "prev" | "next") => {
        const isValidQuantity = localRequestDetail.menu.every(item => {
            const trimmed = item.quantity.trim();
            if (direction === "prev") {
                return trimmed === "" || /^\d+$/.test(trimmed);
            } else {
                return /^\d+$/.test(trimmed);
            }
        });

        if (!isValidQuantity) {
            setShowQuantityErrorModal(true);
            return;
        }

        setRequestDetail(localRequestDetail);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        direction === "next" ? setShouldProceedNext(true) : onPrev();
    }, [localRequestDetail, setShouldProceedNext, onPrev]);

    return (
        <div className="flex flex-col gap-4">
            <InputField
                label="파트너(업체명/가게명)"
                dropdown={true}
                value={localRequestDetail.storeName}
                onInput={(e) => handleChange("storeName", e.currentTarget.value)}
            />

            <InputField
                label="파트너 대표자 연락처"
                dropdown={false}
                value={localRequestDetail.partnerPhone}
                onInput={(e) => handleChange("partnerPhone", e.currentTarget.value)}
            />
            {localRequestDetail.menu.map((item, index) => (
                <div key={index} className="flex gap-1 items-end">
                    <div className="flex-[4]">
                        <InputField
                            label="요청 상세 (메뉴명)"
                            dropdown={true}
                            value={item.menuName}
                            onInput={(e) => handleMenuChange(index, "menuName", e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex-[1]">
                        <InputField
                            label="수량"
                            dropdown={false}
                            value={item.quantity}
                            onInput={(e) => handleMenuChange(index, "quantity", e.currentTarget.value)}
                        />
                    </div>
                    {localRequestDetail.menu.length > 1 && (
                        <CommonButton
                            size="mini"
                            isActive={true}
                            mode="textbold"
                            color="red"
                            detail={{label: "−", position: "none"}}
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
                    detail={{label: "+ 메뉴 추가", position: "none"}}
                    onClick={addMenu}
                />
            </div>

            <div className="flex gap-4">
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="fill"
                    color="blue"
                    detail={{label: "이전", position: "left", icon: "arrowicon_line_left_white"}}
                    onClick={() => handleSave("prev")}
                />
                {isButtonActive ? (
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "다음", position: "right", icon: "arrowicon_line_right_white"}}
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
                onConfirm={()=>setShowQuantityErrorModal(false)}
            />
        </div>
    )
};

export default RequestDetailForm;
