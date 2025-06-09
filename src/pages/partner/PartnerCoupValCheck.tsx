import { useParams } from "react-router-dom";
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
import { fetchCouponDetailService } from "../../services/couponDetailService";
import ReceiptModal from '../../components/common/modal/ReceiptModal';
import { ReceiptCouponData } from '../../types/ReceiptCouponData';

const PartnerCoupValCheck = () => {
    const { couponNum } = useParams<{ couponNum: string }>();

    const [couponData, setCouponData] = useState<PartnerCouponValidationResponse | null>(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<"use" | "cancel" | null>(null);
    const [receiptModalOpen, setReceiptModalOpen] = useState(false);
    const [receiptData, setReceiptData] = useState<ReceiptCouponData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!couponNum) throw new Error("쿠폰 번호 누락");
                const data = await fetchPartnerCouponValidation(couponNum);
                setCouponData(data);
            } catch (err) {
                console.error("쿠폰 조회 실패:", err);
            }
        };
        fetchData();
    }, [couponNum]);

    const openReceiptModal = async () => {
        try {
            if (!couponNum) throw new Error("쿠폰 번호 없음");
            const res = await fetchCouponDetailService(couponNum);

            if (!couponData?.redeem?.redeem_id || !couponData.redeem.payment_code) {
                throw new Error("결제 정보가 누락되어 영수증을 표시할 수 없습니다.");
            }

            const formatted: ReceiptCouponData = {
                coupon_id: res.data.coupon_id,
                partner: {
                    business_name: res.data.partner.business_name,
                    owner_name: res.data.partner.owner_name,
                    owner_phone: res.data.partner.owner_phone,
                    address: res.data.partner.address,
                },
                product: {
                    product_name: res.data.product.product_name,
                },
                register: {
                    name: res.data.register.name,
                    phone: res.data.register.phone,
                },
                registered_at: res.data.registered_at,
                payment_id: couponData.redeem.redeem_id,
                payment_code: couponData.redeem.payment_code,
                paid_qrimage: res.data.paid_qrimage,
                vendor: res.data.vendor,
            };

            setReceiptData(formatted);
            setReceiptModalOpen(true);
        } catch (e) {
            console.error("상세 정보 조회 실패", e);
            alert("상세 정보 조회 중 오류 발생");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col mt-[56px]">
                {couponData && (
                    <DetailBox
                        mode="coupinfo"
                        title="쿠폰 정보"
                        statusType={couponData.status === "USED" ? "used" : "unused"}
                        statusColor={couponData.status === "USED" ? "green" : "red"}
                        leftstring={couponData.status === "USED" ? ["소속 단체명", "요청 상세", "사용 일시"] : ["소속 단체명", "요청 상세"]}
                        rightstring={couponData.status === "USED"
                            ? [
                                couponData.vendor?.vendor_name || "-",
                                couponData.product.product_name || "-",
                                couponData.redeem?.used_at || "-"
                            ]
                            : [
                                couponData.vendor?.vendor_name || "-",
                                couponData.product.product_name || "-"
                            ]
                        }
                    />
                )}

                <div className="w-full flex flex-col gap-4 mt-[106px]">
                    {couponData?.status === "USED" ? (
                        <>
                            <CommonButton
                                size="large"
                                isActive={true}
                                mode="fill"
                                color="blue"
                                detail={{ label: "사용 내역 조회", position: "none" }}
                                onClick={openReceiptModal}
                            />
                            <CommonButton
                                size="large"
                                isActive={true}
                                mode="text"
                                color="red"
                                detail={{ label: "쿠폰 사용 철회", position: "none" }}
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
                            detail={{ label: "쿠폰 사용 처리", position: "none" }}
                            onClick={() => {
                                setConfirmAction("use");
                                setConfirmModalOpen(true);
                            }}
                        />
                    )}
                </div>

                <BasicModal
                    mode="YesNo"
                    isOpen={confirmModalOpen}
                    title={confirmAction === "cancel" ? "쿠폰 사용을 철회할까요?" : "쿠폰을 사용 처리할까요?"}
                    onConfirm={async () => {
                        try {
                            if (!couponNum || !couponData) throw new Error("정보 누락");

                            if (confirmAction === "use") {
                                const res = await fetchCouponUse(couponNum);
                                setCouponData(prev => prev ? {
                                    ...prev,
                                    status: "USED",
                                    redeem: {
                                        redeem_id: res.id,
                                        used_at: res.used_at,
                                        payment_code: couponNum
                                    }
                                } : prev);
                            }

                            if (confirmAction === "cancel") {
                                if (!couponData.redeem?.redeem_id) {
                                    throw new Error("필수 정보 누락");
                                }
                                await fetchCouponCancel(couponData.coupon_id, couponData.redeem.redeem_id);
                                setCouponData(prev => prev ? {
                                    ...prev,
                                    status: "USABLE",
                                    redeem: undefined
                                } : prev);
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

                <ReceiptModal
                    visible={receiptModalOpen}
                    onClose={() => setReceiptModalOpen(false)}
                    coupon={receiptData}
                />
            </div>
        </Layout>
    );
};

export default PartnerCoupValCheck;