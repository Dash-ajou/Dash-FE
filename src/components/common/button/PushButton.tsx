import React, { useState } from "react";
import Icon from "../icons/Icon";

type PushButtonProps = {
  notification: {
    notification_id: number;
    message: string;
    sender_type: string;
    received_at: string;
    readed: boolean;
    tag: "COUPON_EXPIRE_WARNING" | "COUPON_RECEIVED" | "COUPON_USED" | "REQUEST_RECEIVED" | "REQUEST_ISSUED";
  };
  onRead: (id: number) => void;
};

const PushButton: React.FC<PushButtonProps> = ({ notification, onRead }) => {
  const [read, setRead] = useState(notification.readed);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState(0);
  const [isSlid, setIsSlid] = useState(false);

  const getIconName = () => {
    switch (notification.tag) {
      case "COUPON_EXPIRE_WARNING":
        return "clockicon_line";
      case "COUPON_RECEIVED":
        return "gifticon";
      case "COUPON_USED":
      case "REQUEST_ISSUED":
      case "REQUEST_RECEIVED":
        return "checkicon_line_black";
      default:
        return "checkicon_line_black";
    }
  };

  const getIconMessage = () => {
    switch(notification.tag){
      case "COUPON_EXPIRE_WARNING":
      return "쿠폰 만료가 임박했어요";
      case "COUPON_RECEIVED":
        return "쿠폰을 선물받았어요";
      case "COUPON_USED":
        return "쿠폰 사용이 완료되었어요";
      case "REQUEST_ISSUED":
        return "쿠폰 발행 요청이 도착했어요";
      case "REQUEST_RECEIVED":
        return "발행 요청이 수락되었어요";
      default:
        return "bellicon_fill";
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (read) return;
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (read || startX === null) return;
    const deltaX = e.touches[0].clientX - startX; //이동 거리 계산
    if (deltaX < 0) {
      setCurrentX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (read) return;
    if (currentX < -50) {
      setIsSlid(true);
    } else {
      setCurrentX(0);
    }
    setStartX(null);
  };

  //TO-DO: 읽음처리 로직
  const handleReadClick = () => {
    setRead(true); //읽음 처리
    setIsSlid(false);
    setCurrentX(0);
    onRead(notification.notification_id);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex items-center justify-between py-3 px-5 rounded-xl transition-transform duration-300 ${
          read ? "bg-gray-200 text-gray-900" : "bg-blue-50 text-black"
        }`}
        style={{
          transform: `translateX(${isSlid ? -80 : currentX}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-start gap-2">
            <Icon name={getIconName()} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">
                {notification.message || "(내용 없음)"}
              </div>
              <div className="text-xs text-gray-500">
                {getIconMessage()}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {new Date(notification.received_at).toLocaleString()}
              </div>
            </div>
          </div>

        </div>

      </div>

      {!read && isSlid && (
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-20 bg-blue-500 text-white font-semibold text-sm rounded-r-lg cursor-pointer"
          onClick={handleReadClick}
        >
          읽음
        </div>
      )}
    </div>
  );
};

export default PushButton;
