import { useNavigate, useParams } from "react-router-dom";
import DetailBox from "../../components/common/DetailBox";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import {
    fetchPartnerCouponValidation,
    PartnerCouponValidationResponse,
} from "../../services/partnerCouponValidationCheckService";
import BasicModal from "../../components/common/modal/BasicModal";
import CommonButton from "../../components/common/button/CommonButton";
import {
    fetchCouponUse,
    fetchCouponCancel,
} from "../../services/partnerCoupStatusChangeService";
//TO-DO: partnerCoupValidationCheckService.ts에서 응답형식 수정되면 수정할것
const PartnerCoupValCheck = () => {
    const { couponNum } = useParams<{ couponNum: string }>();
    const navigate = useNavigate();

    const [couponData, setCouponData] =
        useState<PartnerCouponValidationResponse | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<"use" | "cancel" | null>(
        null
    );

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
            <Layout>
                <BasicModal
                    mode="OnlyYes"
                    isOpen={modalOpen}
                    title="등록되지 않은 쿠폰입니다."
                    onConfirm={handleConfirm}
                />
            </Layout>
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
                                  partner.partner_name,
                                  product.product_name,
                                  redeem?.used_at ?? "-",
                                  redeem?.payment_code ?? "-",
                              ]
                            : [partner.partner_name, product.product_name]
                    }
                />

                <div className="w-full flex flex-col gap-4 mt-[106px]">
                    {isUsed ? (
                        <>
                            <CommonButton
                                size="large"
                                isActive={true}
                                mode="fill"
                                color="blue"
                                detail={{
                                    label: "사용 내역 조회",
                                    position: "none",
                                }}
                                onClick={() => navigate(`/partner/coupon/status/${couponNum}/detail`)}
                            />
                            <CommonButton
                                size="large"
                                isActive={true}
                                mode="line"
                                color="blue"
                                detail={{
                                    label: "쿠폰 사용 철회",
                                    position: "none",
                                }}
                                onClick={() => {
                                    setConfirmAction("cancel");
                                    setConfirmModalOpen(true);
                                }}
                            />
                        </>
                    ) : (
                        <CommonButton
                            size="large"
                            isActive={true}
                            mode="fill"
                            color="blue"
                            detail={{
                                label: "쿠폰 사용 처리",
                                position: "none",
                            }}
                            onClick={() => {
                                setConfirmAction("use");
                                setConfirmModalOpen(true);
                            }}
                        />
                    )}
                </div>


                <BasicModal
                    mode="OnlyYes"
                    isOpen={modalOpen}
                    title="등록되지 않은 쿠폰입니다."
                    onConfirm={handleConfirm}
                />

                <BasicModal
                    mode="YesNo"
                    isOpen={confirmModalOpen}
                    title={
                        confirmAction === "cancel"
                            ? "쿠폰 사용을 철회할까요?"
                            : "쿠폰을 사용 처리할까요?"
                    }
                    onConfirm={async () => {
                        try {
                            if (!couponNum) throw new Error("쿠폰 번호 누락");

                            if (confirmAction === "cancel") {
                                if (!redeem?.payment_code || !redeem?.redeem_id)
                                    throw new Error("필수 정보 누락");

                                const result = await fetchCouponCancel(
                                    redeem.payment_code,
                                    redeem.redeem_id
                                );
                                console.log("[성공] 사용 철회 결과:", result);

                                setCouponData((prev) =>
                                    prev
                                        ? {
                                              ...prev,
                                              status: "USABLE",
                                              redeem: undefined,
                                          }
                                        : prev
                                );
                            } else if (confirmAction === "use") {
                                const result = await fetchCouponUse(couponNum);
                                console.log("[성공] 사용 처리 결과:", result);

                                setCouponData((prev) =>
                                    prev
                                        ? {
                                              ...prev,
                                              status: "USED",
                                              redeem: {
                                                  redeem_id: result.id,
                                                  used_at: result.used_at,
                                                  payment_code: couponNum,
                                              },
                                          }
                                        : prev
                                );
                            }
                        } catch (e) {
                            console.error("쿠폰 처리 실패:", e);
                            alert("처리 중 오류가 발생했습니다.");
                        } finally {
                            setConfirmModalOpen(false);
                        }
                    }}
                    onClose={() => setConfirmModalOpen(false)}
                />
            </div>
        </Layout>
    );
};

export default PartnerCoupValCheck;
