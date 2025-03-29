import React, {useEffect, useState} from "react";
import CommonButton from "../../common/button/CommonButton.tsx";
import InputField from "../../common/InputField.tsx";
import {PartnerInfo} from "../../../types/JoinTypes.ts";

type PartnerFormProps = {
    partnerInfo: PartnerInfo;
    setPartnerInfo: (info: PartnerInfo) => void;
    onNext: () => void;
}

const INPUT_FIELD_CONFIG = [
    {id: "storeName", placeholder: "상호명"},
    {id: "address", placeholder: "주소"},
];

const PartnerForm: React.FC<PartnerFormProps> = ({partnerInfo, setPartnerInfo, onNext}) => {
    const [localPartnerInfo, setLocalPartnerInfo] = useState<PartnerInfo>(partnerInfo);
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        setIsButtonActive(
            Object.values(localPartnerInfo).every(value => value.trim() !== "")
        );
    }, [localPartnerInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.currentTarget.getAttribute("id");
        if (!key) return;

        const newValue = e.currentTarget.value;

        if (localPartnerInfo[key as keyof PartnerInfo] !== newValue) {
            const updatedInfo = {...localPartnerInfo, [key]: newValue};
            setLocalPartnerInfo(updatedInfo);
        }
    };

    const handleNext = () => {
        setPartnerInfo(localPartnerInfo);
        onNext();
    }

    return (
        <div className="flex flex-col justify-center gap-6 w-full">
            <div className="text-black font-bold text-xl mt-16">상호명과 점주명을 입력해주세요</div>
            {INPUT_FIELD_CONFIG.map((config) => (
                <InputField
                    {...config}
                    dropdown={false}
                    value={localPartnerInfo?.[config.id as keyof typeof localPartnerInfo] ?? ""}
                    onInput={handleChange}
                />
            ))}
            {isButtonActive && (
                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "계속하기", position: "none"}}
                        onClick={handleNext}
                    />
                </div>
            )}
        </div>
    )
}

export default PartnerForm;
