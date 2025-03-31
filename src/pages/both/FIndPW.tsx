import React, {useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FindPWStep} from "../../types/JoinTypes.ts";
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx";
import PasswordInput from "../../components/unit/join/PasswordInput.tsx";
import BasicModal from "../../components/common/modal/BasicModal.tsx";

const FindPW: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentStep = searchParams.get("step") || FindPWStep.PHONE_AUTH;
    const navigate = useNavigate();

    const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
    const [phoneNum, setPhoneNum] = useState<string>("");

    const handleClose = () => {
        setIsAlertModalOpen(false)
        navigate("/");
    }

    return (
        <Layout>
            {currentStep === FindPWStep.PHONE_AUTH && (
                <PhoneAuth
                    phoneNum={phoneNum}
                    setPhoneNum={setPhoneNum}
                    onNext={() => setSearchParams({step: FindPWStep.RESET_PW})}
                />
            )}

            {currentStep === FindPWStep.RESET_PW && (
                <PasswordInput
                    onNext={() => setIsAlertModalOpen(true)}
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
        </Layout>
    )
}

export default FindPW;
