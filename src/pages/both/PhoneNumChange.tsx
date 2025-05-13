import React, {useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx";
import BasicModal from "../../components/common/modal/BasicModal.tsx";
import {useNavigate} from "react-router-dom";

const PhoneNumChange: React.FC = () => {
    const navigate = useNavigate();
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);

    const handleConfirm = () => {
        setIsAlarmOpen(true);
    }

    const handleNo = () => {
        navigate(-1);
    }

    const handleYes = () => {
        //TODO - patch API
        navigate(-1);
    }

    return (
        <Layout>
            <PhoneAuth
                phoneNum={phoneNum}
                setPhoneNum={setPhoneNum}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                onNext={handleConfirm}
            />

            <BasicModal
                mode={"YesNo"}
                isOpen={isAlarmOpen}
                title={"인증이 완료되었습니다"}
                description={"해당 번호로 변경할까요?"}
                onClose={handleNo}
                onConfirm={handleYes}
            />
        </Layout>
    )
}

export default PhoneNumChange;
