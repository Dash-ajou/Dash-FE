import React, {useCallback, useEffect, useState} from 'react';
import InputField from "../../common/InputField.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";
import {VendorInfo} from "../../../types/CouponRequestTypes.ts";

type VendorInfoFormProps = {
    vendorInfo: VendorInfo;
    setVendorInfo: (info: VendorInfo) => void;
    onNext: () => void;
}

const INPUT_FIELD_CONFIG = [
    {label: "발행 단체명", dropdown: false, id: "organizationName"},
    {label: "대표자 명", dropdown: false, id: "representativeName"},
    {label: "대표자 연락처", dropdown: false, id: "representativeContact"},
];

const VendorInfoForm: React.FC<VendorInfoFormProps> = ({vendorInfo, setVendorInfo, onNext}) => {
    const [localVendorInfo, setLocalVendorInfo] = useState<VendorInfo>(vendorInfo);
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        setIsButtonActive(
            Object.values(localVendorInfo).every(value => value.trim() !== "")
        );
    }, [localVendorInfo]);

    const handleSave = useCallback(() => {
        console.log(localVendorInfo);
        setVendorInfo(localVendorInfo);
        onNext();
    }, [localVendorInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.currentTarget.getAttribute("id");
        if (!key) return;

        const newValue = e.currentTarget.value;

        if (localVendorInfo[key as keyof VendorInfo] !== newValue) {
            const updatedInfo = {...localVendorInfo, [key]: newValue};
            setLocalVendorInfo(updatedInfo);
        }
    }

    return (
        <div className="flex flex-col gap-4"> {
            INPUT_FIELD_CONFIG.map(config =>
                <InputField {...config}
                            value={localVendorInfo?.[config.id as keyof typeof localVendorInfo] ?? ""}
                            onInput={handleChange}
                />
            )}
            <div className="flex gap-4">
                <div className="flex-1"></div>
                {isButtonActive && (
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "다음", position: "right", icon: "arrowicon_line_right_white"}}
                        onClick={handleSave}
                    />
                )}
            </div>
        </div>
    )
};

export default VendorInfoForm;
