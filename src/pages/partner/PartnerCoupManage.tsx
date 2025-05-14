import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const PartnerCoupManage: React.FC = () => {
    const { couponNum } = useParams<{ couponNum: string }>();

    return (
        <Layout>
            <h1 className="text-black">{couponNum}</h1>
        </Layout>
    );
};

export default PartnerCoupManage;
