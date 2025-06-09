import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import OAuthConnect from "../../components/unit/join/OAuthConnect.tsx"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/store.ts"
import { useSelector } from "react-redux"
import EmailUpdate from "../../components/unit/join/EmailUpdate.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"

const EmailChange: React.FC = () => {
    const navigate = useNavigate()
    const email = useSelector((state: RootState) => state.user.email)
    const [viewConfirm, setViewConfirm] = useState<boolean>(false)
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
        navigate("/user/main")
    }
    return (
        <Layout>
            {!email ? (
                <OAuthConnect onNext={() => setViewConfirm(true)} bottomPosition={bottomPosition} />
            ) : (
                <EmailUpdate />
            )}

            <BasicModal
                mode={"OnlyYes"}
                isOpen={viewConfirm}
                title={"이메일을 등록했어요"}
                onConfirm={handleConfirm}
            />
        </Layout>
    )
}

export default EmailChange
