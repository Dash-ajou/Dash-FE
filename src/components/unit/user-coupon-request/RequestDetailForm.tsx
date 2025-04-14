import React, {useCallback, useState} from 'react';
import InputField from "../../common/InputField.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";
import {RequestDetail} from "../../../types/CouponRequestTypes.ts";

type RequestDetailFormProps = {
    requestDetail: RequestDetail;
    setRequestDetail: (info: RequestDetail) => void;
    onPrev: () => void;
    onNext: () => void;
}

const RequestDetailForm: React.FC<RequestDetailFormProps> = ({requestDetail, setRequestDetail, onPrev, onNext}) => {
    const [localRequestDetail, setLocalRequestDetail] = useState<RequestDetail>(requestDetail);
    //const [isButtonActive, setIsButtonActive] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.currentTarget.getAttribute("id");
        if (!key) return;

        const newValue = e.currentTarget.value;

        if (localRequestDetail[key as keyof RequestDetail] !== newValue) {
            const updatedInfo = {...localRequestDetail, [key]: newValue};
            setLocalRequestDetail(updatedInfo);
        }
    }

    const handleSave = useCallback(() => {
        console.log(localRequestDetail);
        setRequestDetail(localRequestDetail);
        onNext();
    }, [localRequestDetail]);

    return (
        <div className="flex flex-col gap-4">
            <InputField
                label="파트너(업체명/가게명)"
                dropdown={true}
                value={localRequestDetail.storeName}
                onInput={handleChange}
            />
            <InputField
                label="파트너 대표자 연락처"
                dropdown={false}
                value={localRequestDetail.partnerPhone}
                onInput={handleChange}
            />
            <div className="flex gap-1">
                <div className="flex-5">
                    <InputField
                        label="요청 상세 (메뉴명)"
                        dropdown={true}
                        value={localRequestDetail.menu[0].menuName}
                    />
                </div>
                <div className="flex-5">
                    <InputField
                        label="수량"
                        dropdown={false}
                        value={localRequestDetail.menu[0].quantity}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="fill"
                    color="blue"
                    detail={{label: "이전", position: "left", icon: "arrowicon_line_left_white"}}
                    onClick={onPrev}
                />
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="fill"
                    color="blue"
                    detail={{label: "다음", position: "right", icon: "arrowicon_line_right_white"}}
                    onClick={handleSave}
                />
            </div>
        </div>
    )
};

export default RequestDetailForm;
