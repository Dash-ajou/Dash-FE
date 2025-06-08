import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import PhoneAuth from "../../components/unit/join/PhoneAuth.tsx"
import { useNavigate } from "react-router-dom"

const PartnerAuth: React.FC = () => {
    const navigate = useNavigate()
    const [phoneNum, setPhoneNum] = useState<string>("")
    const [isVerified, setIsVerified] = useState<boolean>(false)
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
    return (
        <Layout>
            <PhoneAuth
                phoneNum={phoneNum}
                setPhoneNum={setPhoneNum}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                onNext={() => navigate("/")} //TODO - 인증 이후 페이지 이동
                bottomPosition={bottomPosition}
            />
        </Layout>
    )
}

export default PartnerAuth
