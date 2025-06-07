import React, { useState } from "react"
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

    const handleConfirm = () => {
        navigate("/user/main")
    }
    return (
        <Layout>
            {!email ? <OAuthConnect onNext={() => setViewConfirm(true)} /> : <EmailUpdate />}

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
