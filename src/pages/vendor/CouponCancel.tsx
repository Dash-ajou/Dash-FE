import Layout from "../../components/layout/Layout.tsx";
import InputField from "../../components/common/InputField.tsx";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import BasicModal from "../../components/common/modal/BasicModal.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { fetchCouponCancel } from "../../services/partnerCoupStatusChangeService.ts";

const CouponCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const payment_code = location.state?.payment_code;
  const [verifyCode, setVerifyCode] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleCancel = async () => {
    try {
      if (!payment_code) {
        throw new Error("쿠폰 정보가 올바르지 않습니다.");
      }
      await fetchCouponCancel(payment_code);
      setModalTitle("쿠폰 사용이 철회되었습니다");
    } catch (err) {
      console.error(err);
      setModalTitle("쿠폰 철회에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsModalOpen(true);

  if (!payment_code) {
    return (
      <Layout>
        <div className="w-full mx-auto mt-16 flex flex-col gap-6 px-6 pb-40">
          <div className="text-black font-bold text-xl">잘못된 접근입니다</div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="w-full mx-auto mt-16 flex flex-col gap-6 px-6 pb-40">
          <div className="text-black font-bold text-xl">쿠폰 철회 인증번호를 입력해주세요</div>
          <InputField
            label="인증번호를 입력해주세요"
            dropdown={false}
            value={verifyCode}
            onInput={handleInputChange}
            notice={
              showNotice ? { detail: "인증번호는 6자리여야 합니다", color: "red" } : undefined
            }
          />
        </div>

      <BasicModal
        mode="OnlyYes"
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={() => {
          setIsModalOpen(false);
          if (modalTitle.includes("완료")) {
            navigate(-1);
          }
        }}
        onConfirm={() => {
          setIsModalOpen(false);
          if (modalTitle.includes("완료")) {
            navigate(-1);
          }
        }}
      />
    </>
  );
};

export default CouponCancel
