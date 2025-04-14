import React, { useState } from "react";
import CouponTabs from "../../components/unit/user-coupon-request/CouponTabs.tsx";
import VendorInfoForm from "../../components/unit/user-coupon-request/VendorInfoForm.tsx";
import RequestDetailForm from "../../components/unit/user-coupon-request/RequestDetailForm.tsx";
import Layout from "../../components/layout/Layout.tsx";
import {VendorInfo, RequestDetail} from "../../types/CouponRequestTypes.ts";

const CouponRequest: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0); // 0: 벤더정보, 1: 요청상세

    const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
        organizationName: "",
        representativeName: "",
        representativeContact: "",
    })

    const [requestDetail, setRequestDetail] = useState<RequestDetail>({
        storeName: "",
        partnerPhone: "",
        menu: [{ menuName: "", quantity: "" }],
    })

    const handleTabChange = (tab: number) => {
        setActiveTab(tab);
    };

    return (
        <Layout>
            <CouponTabs
                tabs={[{ label: "벤더 정보" }, { label: "요청 상세" }]}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            {activeTab === 0 && (
                <VendorInfoForm
                    vendorInfo={vendorInfo}
                    setVendorInfo={setVendorInfo}
                    onNext={() => setActiveTab(1)}
                />
            )}

            {activeTab === 1 && (
                <RequestDetailForm
                    requestDetail={requestDetail}
                    setRequestDetail={setRequestDetail}
                    onPrev={()=>setActiveTab(0)}
                    onNext={()=>setActiveTab(2)} //TODO-확인 페이지로 navigate
                />
            )}
        </Layout>
    );
};

export default CouponRequest;
