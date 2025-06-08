import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { useNavigate } from "react-router-dom"

const PhoneNumChange: React.FC = () => {
    const navigate = useNavigate()
    const [phoneNum, setPhoneNum] = useState<string>("")
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false)
    const [bottomPosition, setBottomPosition] = useState(336)

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
                bottomPosition={bottomPosition}
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
