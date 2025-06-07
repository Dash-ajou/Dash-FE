import React, { useState } from "react"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import CommonButton from "../../common/button/CommonButton.tsx"
import BasicModal from "../../common/modal/BasicModal.tsx"
import { googleOAuth } from "../../../services/authService.ts"

type OAuthConnectProps = {
    onNext: () => void
    onEmailReceived?: (email: string) => void
}

const OAuthConnect: React.FC<OAuthConnectProps> = ({ onNext, onEmailReceived }) => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)

    const login = useGoogleLogin({
        onSuccess: async (response: TokenResponse) => {
            const apiRes = await googleOAuth({ google_access_token: response.access_token })
            const email = apiRes?.data ?? ""
            if (email && onEmailReceived) {
                onEmailReceived(email)
                onNext()
            } else {
                alert("이메일을 받아오지 못했습니다.")
            }
        },
        onError: () => alert("구글 로그인 실패"),
        scope: "openid profile email",
    })

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
                <button
                    className="gsi-material-button"
                    style={{ width: 400 }}
                    type="button"
                    onClick={() => login()} // 실제 구글 로그인 함수로 연결
                >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                style={{ display: "block" }}
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                ></path>
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                ></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents">Continue with Google</span>
                        <span style={{ display: "none" }}>Continue with Google</span>
                    </div>
                </button>

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
