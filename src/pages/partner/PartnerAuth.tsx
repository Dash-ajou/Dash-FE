import React, {useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx";
import {useNavigate} from "react-router-dom";

const PartnerAuth: React.FC = () => {
    const navigate=useNavigate();
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);

    return (
        <Layout>
            <PhoneAuth
                phoneNum={phoneNum}
                setPhoneNum={setPhoneNum}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                onNext={()=>navigate("/")} //TODO - 인증 이후 페이지 이동
            />
        </Layout>
    )
}

export default PartnerAuth;
