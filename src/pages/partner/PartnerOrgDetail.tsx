import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useLocation 대신 useParams 임포트
import Layout from "../../components/layout/Layout";
import DetailBox from "../../components/common/DetailBox";
import { fetchPartnerOrgDetailStat } from "../../services/partnerOrgDetailStatService";
import type { PartnerOrgDetail } from "../../services/partnerOrgDetailStatService";

const PartnerOrgDetail = () => {
    const { vendorId: vendorIdParam } = useParams<{ vendorId: string }>(); // URL에서 vendorId를 문자열로 가져옴
    const [detail, setDetail] = useState<PartnerOrgDetail | null>(null);

    const vendorId = vendorIdParam ? parseInt(vendorIdParam, 10) : undefined;

    useEffect(() => {
        if (vendorId === undefined || isNaN(vendorId)) {
            console.error("Invalid vendorId received:", vendorIdParam);
            return;
        }

        const loadDetail = async () => {
            try {
                const res = await fetchPartnerOrgDetailStat(vendorId);
                setDetail(res);
            } catch (error) {
                console.error("Failed to load partner organization detail:", error);
                setDetail(null);
            }
        };
        loadDetail();
    }, [vendorId]);

    if (!detail) {
        return <div className="text-center mt-10">상세 정보를 불러오는 중입니다...</div>;
    }

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
                    requestList={detail.details.request_detail.map(
                        (name, idx) => ({
                            name,
                            count: detail.details.request_count[idx] ?? 0,
                        })
                    )}
                    rightstring={[
                        detail.details.total_price,
                        detail.details.approval_date.replace(/-/g, "/"),
                    ]}
                />
            </div>
        </Layout>
    );
};

export default PartnerOrgDetail;