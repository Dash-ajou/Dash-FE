import React, { useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FindPWStep } from "../../types/JoinTypes.ts"
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx"
import PasswordInput from "../../components/unit/join/PasswordInput.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { passwordReset } from "../../services/authService.ts"

const FindPW: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentStep = searchParams.get("step") || FindPWStep.PHONE_AUTH
    const navigate = useNavigate()

    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)
    const [isFailAlertModalOpen, setIsFailAlertModalOepn] = useState<boolean>(false)
    const [phoneNum, setPhoneNum] = useState<string>("")
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleClose = () => {
        setIsAlertModalOpen(false)
        navigate("/")
    }

    const handlePWReset = async () => {
        const response = await passwordReset({
            user_phone: phoneNum,
            new_password: password,
            new_password_confirm: confirmPassword,
        })

        if (response.success) {
            setIsAlertModalOpen(true)
        } else {
            setIsFailAlertModalOepn(true)
        }
    }

    return (
        <Layout>
            {currentStep === FindPWStep.PHONE_AUTH && (
                <PhoneAuth
                    phoneNum={phoneNum}
                    setPhoneNum={setPhoneNum}
                    isVerified={isVerified}
                    setIsVerified={setIsVerified}
                    onNext={() => setSearchParams({ step: FindPWStep.RESET_PW })}
                />
            )}

            {currentStep === FindPWStep.RESET_PW && (
                <PasswordInput
                    onNext={handlePWReset}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                />
            )}

            <BasicModal
                mode={"YesNo"}
                isOpen={isAlertModalOpen}
                title={"비밀번호 재설정이 완료되었습니다"}
                description={"바로 로그인할까요?"}
                onClose={handleClose}
                onConfirm={() => navigate("/login")}
            />

            <BasicModal
                mode={"OnlyYes"}
                isOpen={isFailAlertModalOpen}
                title={"비밀번호 재설정에 실패했습니다."}
                description={"다시 시도해주세요."}
                onConfirm={() => setIsFailAlertModalOepn(false)}
            />
        </Layout>
    )
}

export default FindPW
