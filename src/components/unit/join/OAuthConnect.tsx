import React, {useEffect, useState} from "react";
import CommonButton from "../../common/button/CommonButton.tsx";
import BasicModal from "../../common/modal/BasicModal.tsx";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const REDIRECT_URI = "YOUR_REDIRECT_URI"; // 로그인 후 리디렉트될 URI

type OAuthConnectProps = {
    onNext: () => void;
}

const OAuthConnect: React.FC<OAuthConnectProps> = ({onNext}) => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePass = () => {
        setIsAlertModalOpen(true);
    }

    return (
        <div className="flex flex-col justify-center gap-4 w-full">
            <div className="text-black font-bold text-xl mt-16">이메일 등록이 필요해요 <br/>학교 계정이 있다면 연결해주세요</div>

            <div className="absolute bottom-[325px] px-6 left-0 right-0 w-full flex flex-col">
                <div id="g_id_onload"
                     data-client_id={CLIENT_ID}
                     data-context="use"
                     data-ux_mode="redirect"
                     data-login_uri={REDIRECT_URI}
                     data-auto_prompt="false">
                </div>

                <div className="g_id_signin h-10"
                     data-type="standard"
                     data-shape="rectangular"
                     data-theme="outline"
                     data-text="continue_with"
                     data-size="large"
                     data-logo_alignment="left"
                >
                </div>

                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="gray"
                    detail={{label: "건너뛰기", position: "none"}}
                    onClick={handlePass}
                />

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

export default OAuthConnect;
