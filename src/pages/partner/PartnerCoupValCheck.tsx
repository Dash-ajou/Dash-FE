import { useNavigate, useParams } from "react-router-dom";
import DetailBox from "../../components/common/DetailBox";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import {
    fetchPartnerCouponValidation,
    PartnerCouponValidationResponse,
} from "../../services/partnerCouponValidationCheckService";
import BasicModal from "../../components/common/modal/BasicModal";

const PartnerCoupValCheck = () => {
    const { couponNum } = useParams<{ couponNum: string }>();
    const navigate = useNavigate();

    const [couponData, setCouponData] =
        useState<PartnerCouponValidationResponse | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!couponNum) throw new Error("쿠폰 번호 누락");
                const data = await fetchPartnerCouponValidation(couponNum);
                if (
                    data.type === "REGISTER_CODE" &&
                    data.status === "REGISTERABLE"
                ) {
                    setModalOpen(true);
                    return;
                }
                setCouponData(data);
            } catch (err) {
                console.error("쿠폰 조회 실패:", err);
                setModalOpen(true);
            }
        };
        fetchData();
    }, [couponNum]);

    const handleConfirm = () => navigate(-1);

    if (!couponData) {
        return (
            <>
                <Layout>
                    <BasicModal
                        mode="OnlyYes"
                        isOpen={modalOpen}
                        title="등록되지 않은 쿠폰입니다."
                        onConfirm={handleConfirm}
                    />
                </Layout>
            </>
        );
    }

    const { partner, product, status, redeem } = couponData;
    const isUsed = status === "USED";

    return (
        <Layout>
            <div className="flex flex-col mt-[56px] px-5">
                <DetailBox
                    mode="coupinfo"
                    title="쿠폰 정보"
                    statusType={isUsed ? "used" : "unused"}
                    statusColor={isUsed ? "green" : "red"}
                    leftstring={
                        isUsed
                            ? [
                                  "소속 단체명",
                                  "요청 상세",
                                  "사용 일시",
                                  "결제 코드",
                              ]
                            : ["소속 단체명", "요청 상세"]
                    }
                    rightstring={
                        isUsed
                            ? [
                                  partner.business_name,
                                  product.product_name,
                                  redeem?.used_at.replace(" ", " ") ?? "-",
                                  redeem?.payment_code ?? "-",
                              ]
                            : [partner.business_name, product.product_name]
                    }
                />
                <BasicModal
                    mode="OnlyYes"
                    isOpen={modalOpen}
                    title="등록되지 않은 쿠폰입니다."
                    onConfirm={handleConfirm}
                />
            </div>
        </Layout>
    );
};

export default PartnerCoupValCheck;
