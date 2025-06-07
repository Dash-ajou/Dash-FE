import React, { useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { useNavigate } from "react-router-dom"

const PhoneNumChange: React.FC = () => {
    const navigate = useNavigate()
    const [phoneNum, setPhoneNum] = useState<string>("")
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false)

    const handleConfirm = () => {
        setIsAlarmOpen(true)
    }

    const handleYes = async () => {
        navigate(-1)
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
                mode={"OnlyYes"}
                isOpen={isAlarmOpen}
                title={"전화번호가 변경되었어요"}
                onConfirm={handleYes}
            />
        </Layout>
    )
}

export default PhoneNumChange
