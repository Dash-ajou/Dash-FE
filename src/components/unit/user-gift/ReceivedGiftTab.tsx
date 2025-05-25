import React from "react";
import { ReceivedGift } from "../../../services/userReceivedGiftService";
import Block from "../../module/Block";
import StatusButton from "./StatusButton";

interface ReceivedGiftTabProps {
  loading: boolean;
  receivedGifts: ReceivedGift[];
}

const ReceivedGiftTab: React.FC<ReceivedGiftTabProps> = ({ loading, receivedGifts }) => {
  if (loading) return <p>로딩 중...</p>;

  if (receivedGifts.length === 0) return <p>받은 선물이 없습니다.</p>;

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        {receivedGifts.map((gift) => (
          <Block
            key={gift.coupon_id}
            type="button"
            title={gift.coupon_name}
            subtitle={gift.partner_name}
            info={`유효기간 ~${gift.valid_until}`}
            action={
              gift.coupon_status === "PENDING" ? (
                <StatusButton label="수락" available />
              ) : (
                <StatusButton label="완료" available={false} />
              )
            }
            statusType={gift.coupon_status === "PENDING" ? "pending" : "approved"}
          />
        ))}
        <div className="text-center">
          <p className="text-black text-sm font-semibold opacity-30">
            선물은 7일 동안 수락 가능해요
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceivedGiftTab;
