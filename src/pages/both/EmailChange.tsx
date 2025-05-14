import React from "react";
import Layout from "../../components/layout/Layout.tsx";
import OAuthConnect from "../../components/unit/join/OAuthConnect.tsx";
import {useNavigate} from "react-router-dom";

const EmailChange: React.FC = () => {
    const navigate=useNavigate();

    return(
        <Layout>
            <OAuthConnect onNext={()=>navigate('/user/main')}/>
        </Layout>
    )
}

export default EmailChange;
