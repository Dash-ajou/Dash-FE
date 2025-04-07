import React, { useState } from "react";
import Icon from "../icons/Icon";

type PushButtonProps = {
  notification: {
    notification_id: number;
    message: string;
    sender_type: string;
    received_at: string;
    readed: boolean;
  };
  onRead: (id: number) => void;
};

const PushButton: React.FC<PushButtonProps> = ({ notification, onRead }) => {
  const [read, setRead] = useState(notification.readed);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState(0);
  const [isSlid, setIsSlid] = useState(false);

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (read) return;
    setStartX(e.touches[0].clientX); //터치 시작 지점 저장
  };

  // 터치 이동
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (read || startX === null) return;
    const deltaX = e.touches[0].clientX - startX; //이동 거리 계산
    if (deltaX < 0) {
      setCurrentX(deltaX);
    }
  };

  // 터치 종료
  const handleTouchEnd = () => {
    if (read) return;
    if (currentX < -50) {
      // -50px 이상 이동하면 슬라이드 완료
      setIsSlid(true);
    } else {
      setCurrentX(0);
    }
    setStartX(null);
  };

  // 읽음 버튼 클릭 시 처리
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
          <div className="flex items-center">
            <Icon name="bellicon_fill" />
            <div className="font-semibold text-base ml-2">
              {notification.message}
            </div>
          </div>
          <div className="text-xs text-gray-600">
            {new Date(notification.received_at).toLocaleString()}
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
