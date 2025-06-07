import React from "react"
import Layout from "../../components/layout/Layout.tsx"
import OAuthConnect from "../../components/unit/join/OAuthConnect.tsx"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/store.ts"
import { useSelector } from "react-redux"
import EmailUpdate from "../../components/unit/join/EmailUpdate.tsx"

const EmailChange: React.FC = () => {
    const navigate = useNavigate()
    const email = useSelector((state: RootState) => state.user.email)

    return (
        <Layout>
            {!email ? <OAuthConnect onNext={() => navigate("/user/main")} /> : <EmailUpdate />}
        </Layout>
    )
}

export default EmailChange
