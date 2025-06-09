import React, { useEffect, useRef, useState } from "react";
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
  slidId: number | null;
  setSlidId: (id: number | null) => void;
};

const PushButton: React.FC<PushButtonProps> = ({
                                                 notification,
                                                 onRead,
                                                 slidId,
                                                 setSlidId
                                               }) => {
  const [read, setRead] = useState(notification.readed);
  const [startX, setStartX] = useState<number | null>(null);
  const [deltaX, setDeltaX] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isSlid = slidId === notification.notification_id;

  useEffect(() => {
    if (!isSlid) setDeltaX(0);
  }, [isSlid]);

  useEffect(() => {
    const handleClickOrTouch = (e: MouseEvent | TouchEvent) => {
      if (
          isSlid &&
          wrapperRef.current &&
          e.target instanceof Node &&
          !wrapperRef.current.contains(e.target)
      ) {
        setSlidId(null); // 외부 클릭이면 슬라이드 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOrTouch);
    document.addEventListener("touchstart", handleClickOrTouch);
    return () => {
      document.removeEventListener("mousedown", handleClickOrTouch);
      document.removeEventListener("touchstart", handleClickOrTouch);
    };
  }, [isSlid]);

  const getIconName = () => {
    switch (notification.tag) {
      case "COUPON_EXPIRE_WARNING": return "clockicon_line";
      case "COUPON_RECEIVED": return "gifticon";
      case "COUPON_USED":
      case "REQUEST_ISSUED":
      case "REQUEST_RECEIVED": return "checkicon_line_black";
      default: return "checkicon_line_black";
    }
  };

  const getIconMessage = () => {
    switch (notification.tag) {
      case "COUPON_EXPIRE_WARNING": return "쿠폰 만료가 임박했어요";
      case "COUPON_RECEIVED": return "쿠폰을 선물받았어요";
      case "COUPON_USED": return "쿠폰 사용이 완료되었어요";
      case "REQUEST_ISSUED": return "쿠폰 발행 요청이 도착했어요";
      case "REQUEST_RECEIVED": return "발행 요청이 수락되었어요";
      default: return "알림 도착";
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (read) return;
    if (slidId !== null && slidId !== notification.notification_id) {
      setSlidId(null);
      return;
    }
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (read || startX === null) return;
    const moveX = e.touches[0].clientX - startX;
    if (moveX < 0) setDeltaX(moveX);
  };

  const handleTouchEnd = () => {
    if (read) return;
    if (deltaX < -50) {
      setSlidId(notification.notification_id);
    } else {
      setSlidId(null);
    }
    setStartX(null);
  };

  const handleReadClick = () => {
    setRead(true);
    setSlidId(null);
    onRead(notification.notification_id);
  };

  return (
      <div ref={wrapperRef} className="relative w-full overflow-hidden">
        <div
            className={`flex items-center justify-between py-3 px-5 rounded-xl transition-transform duration-300 ${
                read ? "bg-gray-200 text-gray-900" : "bg-blue-50 text-black"
            }`}
            style={{
              transform: `translateX(${isSlid ? -80 : deltaX}px)`,
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
                <div className="text-xs text-gray-500">{getIconMessage()}</div>
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
