import React, { useState } from "react"
import { CredentialResponse, GoogleLogin, TokenResponse } from "@react-oauth/google"
import CommonButton from "../../common/button/CommonButton.tsx"
import BasicModal from "../../common/modal/BasicModal.tsx"
import { googleOAuth } from "../../../services/authService.ts"

type OAuthConnectProps = {
    onNext: () => void
    onEmailReceived?: (email: string) => void
}

const OAuthConnect: React.FC<OAuthConnectProps> = ({ onNext, onEmailReceived }) => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)

    const handleGoogleLoginSuccess = async (response: CredentialResponse | TokenResponse) => {
        let email = ""
        if ("access_token" in response && response.access_token) {
            const Response = await googleOAuth({ google_access_token: response.access_token })
            email = Response?.data ?? ""
        } else if ("credential" in response && response.credential) {
            const Response = await googleOAuth({ google_access_token: response.credential })
            email = Response?.data ?? ""
        } else {
            alert("구글 인증 토큰을 받지 못했습니다.")
            return
        }
        if (email && onEmailReceived) {
            onEmailReceived(email)
            onNext()
        } else {
            alert("이메일을 받아오지 못했습니다.")
        }
    }

    const handleGoogleLoginError = () => {
        alert("구글 로그인 실패")
    }

    const handlePass = () => {
        setIsAlertModalOpen(true)
    }

    return (
        <div className="flex flex-col justify-center gap-4 w-full">
            {window.location.pathname === "/mypage/update/email" ? (
                <div className="text-black font-bold text-xl mt-16">
                    이메일을 수정할 수 있어요 <br />
                    학교 계정을 다시 연결해주세요
                </div>
            ) : (
                <div className="text-black font-bold text-xl mt-16">
                    이메일 등록이 필요해요 <br />
                    학교 계정이 있다면 연결해주세요
                </div>
            )}

            <div className="absolute bottom-[325px] left-0 right-0 px-6 w-full flex flex-col">
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    useOneTap={false}
                    width="100%"
                />

                {window.location.pathname !== "/mypage/update/email" && (
                    <CommonButton
                        size="mini"
                        isActive={true}
                        mode="text"
                        color="gray"
                        detail={{ label: "건너뛰기", position: "none" }}
                        onClick={handlePass}
                    />
                )}

                <BasicModal
                    mode={"YesNo"}
                    isOpen={isAlertModalOpen}
                    title={"추후에 등록이 필요할 수도 있어요"}
                    description={"이메일 등록은 마이페이지에서도 가능해요"}
                    onClose={() => setIsAlertModalOpen(false)}
                    onConfirm={() => onNext()}
                />
            </div>
        </div>
    )
}

export default OAuthConnect
