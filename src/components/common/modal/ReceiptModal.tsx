import React, { useState } from "react";
import CommonButton from "../button/CommonButton";
import BasicModal from "../modal/BasicModal";
import { fetchCouponCancel } from "../../../services/partnerCoupStatusChangeService";
import { ReceiptCouponData } from "../../../types/ReceiptCouponData";
import { useLocation, useNavigate } from "react-router-dom";

type ReceiptModalProps = {
  visible: boolean;
  onClose: () => void;
  coupon: ReceiptCouponData | null;
};

const ReceiptModal: React.FC<ReceiptModalProps> = ({ visible, onClose, coupon }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [resultModalTitle, setResultModalTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isUserPath = location.pathname.includes("/user");

  if (!visible || !coupon) return null;

  const handleCancelConfirm = async () => {
    try {
      if (!coupon.payment_code) {
        throw new Error("결제 코드가 없습니다.");
      }

      if (isUserPath) {
        navigate(`/user/coupon/published/${coupon.issue_id}/cancel`, {
          state: { payment_code: coupon.payment_code },
        });
      } else {
        await fetchCouponCancel(coupon.payment_code);
        setResultModalTitle("쿠폰 사용이 철회되었습니다.");
        setResultModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      setResultModalTitle("쿠폰 정보가 올바르지 않습니다.");
      setResultModalOpen(true);
    } finally {
      setConfirmModalOpen(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}>
        <div
          className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.5)] justify-center items-center px-[25px] pt-[73px] pb-3"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-center mb-5">
            <p className="text-2xl text-black font-bold">{coupon.partner.business_name}</p>
          </div>

          <div className="flex flex-col justify-start items-start">
            {coupon.partner.address && (
              <p className="text-xs text-black font-medium text-neutral-600">
                {coupon.partner.address}
              </p>
            )}
            {coupon.partner.owner_name && (
              <p className="text-xs text-black font-medium mb-5 text-neutral-600">
                {coupon.partner.owner_name}
              </p>
            )}
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
          </div>

          <div className="flex gap-[72px] py-5">
            <div>
              <p className="text-sm text-black font-semibold">발행 단체명</p>
              <p className="text-sm text-black font-semibold">대표자명</p>
              <p className="text-sm text-black font-semibold">대표자 연락처</p>
              <p className="text-sm text-black font-semibold">요청 상세</p>
              <p className="text-sm text-black font-semibold">사용 일시</p>
            </div>
            <div>
              <p className="text-sm text-black font-light">{coupon.vendor?.vendor_name ?? "-"}</p>
              <p className="text-sm text-black font-light">{coupon.register.name}</p>
              <p className="text-sm text-black font-light">{coupon.register.phone}</p>
              <p className="text-sm text-black font-light">{coupon.product.product_name}</p>
              <p className="text-sm text-black font-light">
                {new Date(coupon.registered_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>

          <div className="flex flex-col items-center justify-center mb-8 gap-2">
            <div className="mt-6 w-60 h-60 border flex items-center justify-center bg-gray-100 rounded-md">
              {coupon.paid_qrimage ? (
                <img
                  src={coupon.paid_qrimage}
                  alt="QR 코드"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <span className="text-sm text-gray-400">QR 이미지 없음</span>
              )}
            </div>
          </div>

          {!isUserPath && (
            <div className="flex justify-center">
              <CommonButton
                size="mini"
                mode="text"
                color="red"
                isActive={true}
                detail={{
                  label: "쿠폰 사용 철회",
                  position: "none",
                }}
                onClick={() => setConfirmModalOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      <BasicModal
        mode="OnlyYes"
        isOpen={confirmModalOpen}
        title="쿠폰 사용을 철회하시겠습니까?"
        onConfirm={handleCancelConfirm}
        onClose={() => setConfirmModalOpen(false)}
      />

      <BasicModal
        mode="OnlyYes"
        isOpen={resultModalOpen}
        title={resultModalTitle}
        onConfirm={() => {
          setResultModalOpen(false);
          onClose();
        }}
        onClose={() => {
          setResultModalOpen(false);
          onClose();
        }}
      />
    </>
  );
};

export default ReceiptModal;
