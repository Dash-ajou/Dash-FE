import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import DetailBox from "../../components/common/DetailBox";
import { fetchPartnerOrgDetailStat } from "../../services/partnerOrgDetailStatService";
import type { PartnerOrgDetail } from "../../services/partnerOrgDetailStatService";

const PartnerOrgDetail = () => {
    const location = useLocation();
    const { vendor_id } = location.state || {};
    const [detail, setDetail] = useState<PartnerOrgDetail | null>(null);

    useEffect(() => {
        if (!vendor_id) return;
        const loadDetail = async () => {
            const res = await fetchPartnerOrgDetailStat(vendor_id);
            setDetail(res);
        };
        loadDetail();
    }, [vendor_id]);

    if (!detail) return null;

    return (
        <Layout>
            <div className="mt-8 flex flex-col gap-9">
                <DetailBox
                    mode="default"
                    title="발행 주체"
                    leftstring={["발행 단체명", "대표자 명", "대표자 연락처"]}
                    rightstring={[
                        detail.vendor_name,
                        detail.head_name,
                        detail.head_contact,
                    ]}
                />
                <DetailBox
                    mode="coupinfo"
                    title="발행 상세"
                    leftstring={[
                        "요청 상세",
                        "요청 수량",
                        "총 금액",
                        "승인 일시",
                    ]}
                    rightstring={[
                        detail.details.request_detail,
                        `${detail.details.request_count}EA`,
                        detail.details.total_price,
                        detail.details.approval_date.replace(/-/g, "/"),
                    ]}
                />
            </div>
        </Layout>
    );
};

export default PartnerOrgDetail;
