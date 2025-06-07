import React, { useState } from "react"
import InputField from "../../common/InputField.tsx"
import Status from "../../common/Status.tsx"
import CommonButton from "../../common/button/CommonButton.tsx"
import { emailChange, emailVerify } from "../../../services/authService.ts"
import BasicModal from "../../common/modal/BasicModal.tsx"
import { useNavigate } from "react-router-dom"

const EmailUpdate: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [authCode, setAuthCode] = useState<string>("")

    const [showNotice, setShowNotice] = useState<boolean>(false)
    const [isVerifyClicked, setIsVerifyClicked] = useState<boolean>(false)
    const [showAuthNotice, setShowAuthNotice] = useState<boolean>(false)
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setEmail(value)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value.length > 0 && !emailRegex.test(value)) {
            setShowNotice(true)
        } else {
            setShowNotice(false)
        }
    }

    const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setAuthCode(value)
        setShowAuthNotice(false)
    }

    const handleAuth = async () => {
        const response = await emailVerify({ new_email: email })

        if (response.success) {
            setIsVerifyClicked(true)
        }
    }

    const handleUpdate = async () => {
        const response = await emailChange({ new_email: email, email_verify_code: authCode })

        if (response.success) {
            setShowSuccessModal(true)
        } else {
            setShowAuthNotice(true)
        }
    }

    return (
        <div className="flex flex-col justify-center gap-10 w-full mt-20">
            <div className="flex flex-row">
                <InputField
                    label={"새로운 이메일을 입력해주세요"}
                    dropdown={false}
                    notice={
                        showNotice
                            ? { detail: "올바른 이메일 형식이 아닙니다", color: "red" }
                            : undefined
                    }
                    value={email}
                    onInput={handleChange}
                />
                <div className="mt-4">
                    <Status statusType="verify" color="button" onClick={handleAuth} />
                </div>
            </div>

            {isVerifyClicked && (
                <div className="flex flex-row items-center">
                    <InputField
                        label={"인증번호를 입력해주세요"}
                        dropdown={false}
                        notice={
                            showAuthNotice
                                ? { detail: "인증번호를 다시 확인해주세요", color: "red" }
                                : undefined
                        }
                        value={authCode}
                        onInput={handleAuthChange}
                    />
                    <Status statusType="time" color="timer" />
                </div>
            )}

            {isVerifyClicked && (
                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{ label: "변경하기", position: "none" }}
                        onClick={handleUpdate}
                    />
                </div>
            )}

            <BasicModal
                mode={"OnlyYes"}
                isOpen={showSuccessModal}
                title={"이메일이 변경되었어요"}
                onConfirm={() => navigate(-1)}
            />
        </div>
    )
}

export default EmailUpdate
