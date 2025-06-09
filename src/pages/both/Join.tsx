import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import RoleSelect from "../../components/unit/join/RoleSelect.tsx"
import { Role } from "../../constants/role.ts"
import { useNavigate, useSearchParams } from "react-router-dom"
import PartnerDetail from "../../components/unit/join/PartnerDetail.tsx"
import PartnerForm from "../../components/unit/join/PartnerForm.tsx"
import { JoinStep, PartnerInfo } from "../../types/JoinTypes.ts"
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx"
import NameInfo from "../../components/unit/join/NameInfo.tsx"
import OAuthConnect from "../../components/unit/join/OAuthConnect.tsx"
import PasswordInput from "../../components/unit/join/PasswordInput.tsx"
import JoinComplete from "../../components/unit/join/JoinComplete.tsx"
import { generalJoin, partnerJoin } from "../../services/authService.ts"

const Join: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentStep = searchParams.get("step") || JoinStep.ROLE_SELECT

    const [partnerInfo, setPartnerInfo] = useState<PartnerInfo>({
        storeName: "",
        address: "",
    })

    const [phoneNum, setPhoneNum] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [role, setRole] = useState<(typeof Role)[keyof typeof Role] | null>(null)
    const [email, setEmail] = useState<string>("")

    const [bottomPosition, setBottomPosition] = useState(336)

    const shouldBlock = currentStep === JoinStep.COMPLETE

    useEffect(() => {
        if (!shouldBlock) return

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            event.returnValue = ""
        }

        const handlePopState = () => {
            if (window.confirm("이전 페이지로 이동할 수 없습니다. 메인으로 이동하시나요?")) {
                navigate("/", { replace: true })
            } else {
                // 사용자가 취소를 눌렀으면 원래 페이지에 머물러야 하는데
                // pop은 이미 진행됐으므로, 다시 앞으로 가버리자.
                window.history.forward()
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            window.removeEventListener("popstate", handlePopState)
        }
    }, [shouldBlock, navigate])

    useEffect(() => {
        const updateBottom = () => {
            const windowHeight = window.innerHeight

            if (windowHeight >= 800) {
                setBottomPosition(336)
            } else {
                const decrease = 800 - windowHeight
                const newBottom = 336 - decrease
                setBottomPosition(Math.max(newBottom, 100))
            }
        }

        updateBottom()
        window.addEventListener("resize", updateBottom)
        return () => window.removeEventListener("resize", updateBottom)
    }, [])

    useEffect(() => {
        if (!searchParams.get("step")) {
            setSearchParams({ step: JoinStep.ROLE_SELECT })
        }
    }, [])

    const handleRoleSelect = (selectedRole: (typeof Role)[keyof typeof Role] | null) => {
        setRole(selectedRole)
        setSearchParams({
            step: selectedRole === Role.USER ? JoinStep.PHONE_AUTH : JoinStep.PARTNER_FORM,
        })
    }

    const handleJoin = async (password: string, confirmPassword: string) => {
        if (role === Role.USER) {
            const response = await generalJoin({
                general_name: userName,
                password,
                password_confirm: confirmPassword,
                user_type: "GENERAL",
                general_phone: phoneNum,
                ...(email.trim() !== "" ? { general_email: email } : {}),
            })
            if (response.success) {
                setSearchParams({ step: JoinStep.COMPLETE })
            } else {
                console.error(response.error)
            }
        } else if (role === Role.PARTNER) {
            const response = await partnerJoin({
                partner_name: partnerInfo.storeName,
                partner_address: partnerInfo.address,
                owner_name: userName,
                owner_phone: phoneNum,
                ...(email.trim() !== "" ? { owner_email: email } : {}),
                password,
                password_confirm: confirmPassword,
            })
            if (response.success) {
                setSearchParams({ step: JoinStep.COMPLETE })
            } else {
                console.log(response.data.message)
                console.error(response.error)
            }
        }
    }

    return (
        <Layout>
            {currentStep === JoinStep.ROLE_SELECT && (
                <RoleSelect
                    onSelect={(role) => handleRoleSelect(role)}
                    onPartnerInfo={() => setSearchParams({ step: JoinStep.PARTNER_INFO })}
                />
            )}

            {currentStep === JoinStep.PARTNER_INFO && (
                <PartnerDetail
                    onNext={() => setSearchParams({ step: JoinStep.PARTNER_FORM })}
                    bottomPosition={bottomPosition}
                />
            )}

            {currentStep === JoinStep.PARTNER_FORM && (
                <PartnerForm
                    partnerInfo={partnerInfo}
                    setPartnerInfo={setPartnerInfo}
                    onNext={() => setSearchParams({ step: JoinStep.PHONE_AUTH })}
                    bottomPosition={bottomPosition}
                />
            )}

            {currentStep === JoinStep.PHONE_AUTH && (
                <PhoneAuth
                    phoneNum={phoneNum}
                    setPhoneNum={setPhoneNum}
                    isVerified={isVerified}
                    setIsVerified={setIsVerified}
                    onNext={() => setSearchParams({ step: JoinStep.NAME })}
                    bottomPosition={bottomPosition}
                />
            )}

            {currentStep === JoinStep.NAME && (
                <NameInfo
                    userName={userName}
                    setUserName={setUserName}
                    onNext={() => setSearchParams({ step: JoinStep.OAUTH_CONNECT })}
                    bottomPosition={bottomPosition}
                />
            )}

            {currentStep === JoinStep.OAUTH_CONNECT && (
                <OAuthConnect
                    onNext={() => setSearchParams({ step: JoinStep.PASSWORD_INPUT })}
                    onEmailReceived={(receivedEmail: string) => setEmail(receivedEmail)}
                    bottomPosition={bottomPosition}
                />
            )}

            {currentStep === JoinStep.PASSWORD_INPUT && (
                <PasswordInput
                    onNext={(pw: string, confirmPw: string) => {
                        handleJoin(pw, confirmPw)
                    }}
                    bottomPosition={bottomPosition}
                />
            )}

            {currentStep === JoinStep.COMPLETE && <JoinComplete bottomPosition={bottomPosition} />}
        </Layout>
    )
}

export default Join
