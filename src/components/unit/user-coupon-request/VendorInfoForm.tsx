import React, { useCallback, useEffect, useState } from "react"
import InputField from "../../common/InputField.tsx"
import CommonButton from "../../common/button/CommonButton.tsx"
import { VendorInfo } from "../../../types/CouponRequestTypes.ts"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store.ts"

type VendorInfoFormProps = {
    vendorInfo: VendorInfo
    setVendorInfo: (info: VendorInfo) => void
    onNext: () => void
}

const INPUT_FIELD_CONFIG = [
    { label: "발행 단체명", dropdown: false, id: "organizationName" },
    { label: "대표자 명", dropdown: false, id: "representativeName" },
    { label: "대표자 연락처", dropdown: false, id: "representativeContact" },
]

const VendorInfoForm: React.FC<VendorInfoFormProps> = ({ vendorInfo, setVendorInfo, onNext }) => {
    const [localVendorInfo, setLocalVendorInfo] = useState<VendorInfo>(vendorInfo)
    const [isButtonActive, setIsButtonActive] = useState(false)
    const [useAccountInfo, setUseAccountInfo] = useState<boolean>(false)

    const userInfo = useSelector((state: RootState) => state.user)

    useEffect(() => {
        setIsButtonActive(Object.values(localVendorInfo).every((value) => value.trim() !== ""))
    }, [localVendorInfo])

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setUseAccountInfo(checked)

        if (checked) {
            setLocalVendorInfo({
                ...localVendorInfo,
                representativeName: userInfo.name,
                representativeContact: userInfo.phone,
            })
        }
    }

    const handleSave = useCallback(() => {
        setVendorInfo(localVendorInfo)
        onNext()
    }, [localVendorInfo])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.currentTarget.getAttribute("id")
        if (!key) return

        const newValue = e.currentTarget.value

        if (localVendorInfo[key as keyof VendorInfo] !== newValue) {
            const updatedInfo = { ...localVendorInfo, [key]: newValue }
            setLocalVendorInfo(updatedInfo)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="useAccountInfo"
                    className="
                        appearance-none w-4 h-4 bg-gray-200 rounded-sm
                        checked:bg-gray-200
                        checked:before:content-['✔']
                        checked:before:text-black
                        checked:before:text-[10px]
                        checked:before:flex
                        checked:before:items-center
                        checked:before:justify-center
                        checked:before:w-full
                        checked:before:h-full
                        transition-colors
                    "
                    checked={useAccountInfo}
                    onChange={handleCheck}
                />
                <label htmlFor="useAccountInfo" className="text-sm text-gray-700">
                    계정정보와 동일하게 입력
                </label>
            </div>

            {INPUT_FIELD_CONFIG.map((config) => (
                <InputField
                    {...config}
                    value={localVendorInfo?.[config.id as keyof typeof localVendorInfo] ?? ""}
                    onInput={handleChange}
                    disabled={
                        useAccountInfo &&
                        (config.id === "representativeName" ||
                            config.id === "representativeContact")
                    }
                />
            ))}
            <div className="flex gap-4">
                <div className="flex-1"></div>
                {isButtonActive && (
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
                        onClick={handleSave}
                    />
                )}
            </div>
        </div>
    )
}

export default VendorInfoForm
