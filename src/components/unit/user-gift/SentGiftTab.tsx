import React from "react";
import { SentGift } from "../../../services/userSentGiftService";
import Block from "../../module/Block";
import StatusButton from "./StatusButton";

interface SentGiftTabProps {
  loading: boolean;
  sentGifts: SentGift[];
}

const SentGiftTab: React.FC<SentGiftTabProps> = ({ loading, sentGifts }) => {
  if (loading) return <p>로딩 중...</p>;

  if (sentGifts.length === 0) return <p>보낸 선물이 없습니다.</p>;

  return (
    <>
      {sentGifts.map((gift) => (
        <Block
          key={gift.coupon_id}
          type="button"
          title={gift.coupon_name}
          subtitle={gift.partner_name}
          info={`유효기간 ~${gift.valid_until}`}
          action={
            <StatusButton
              label={gift.coupon_status === "CANCELLED" ? "취소됨" : "완료"}
              available={gift.coupon_status !== "CANCELLED"}
            />
          }
          statusType={gift.coupon_status === "CANCELLED" ? "rejected" : "approved"}
        />
      ))}
    </>
  );
};

export default SentGiftTab;
