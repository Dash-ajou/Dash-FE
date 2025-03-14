import React, { useState, useEffect } from "react";
import Icon from "../icons/Icon";

type PushButtonProps = {
  read: boolean;
  type: "couprequest" | "coupused" | "couptime" | "coupgift";
  title?: string;
  onClick: () => void;
  onRead: () => void;
};

const PushButton: React.FC<PushButtonProps> = ({
  read: initialRead,
  type,
  title = "호시 타코야키 오리지널 10EA",
  onClick,
  onRead,
}) => {
  const [read, setRead] = useState(initialRead);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState(0);
  const [isSlid, setIsSlid] = useState(false);

  const iconAndAlarm = (() => {
    switch (type) {
      case "couprequest":
        return {
          icon: <Icon name="checkicon_line_black" />,
          message: "쿠폰 발행 요청이 도착했어요",
        };
      case "coupused":
        return {
          icon: <Icon name="checkicon_line_black" />,
          message: "쿠폰 사용이 완료되었어요",
        };
      case "couptime":
        return {
          icon: <Icon name="clockicon_line" />,
          message: "쿠폰 만료가 임박했어요",
        };
      case "coupgift":
        return {
          icon: <Icon name="gifticon_line" />,
          message: "쿠폰을 선물받았어요",
        };
      default:
        return { icon: null, message: "" };
    }
  })();

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

    if (!isSlid) {
      onClick();
    }
  };

  // 읽음 버튼 클릭 시 처리
  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); //부모 클릭 이벤트 실행 방지
    setRead(true); //읽음 처리
    onRead();
    setIsSlid(false);
    setCurrentX(0);
  };

  // 슬라이드 초기화
  const resetSlide = () => {
    setIsSlid(false);
    setCurrentX(0);
  };

  // 화면 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isSlid) {
        resetSlide();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSlid]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex items-center justify-between py-3 px-5 rounded-xl transition-transform duration-300 ${
          read ? "bg-gray-200 text-gray-900" : "bg-blue-50 text-black"
        }`}
        style={{
          transform: `translateX(${isSlid ? -80 : currentX}px)`,
          transition: "transform 0.3s ease",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <div>{iconAndAlarm.icon}</div>
            <div className="font-semibold text-base ml-2">{title}</div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs">{iconAndAlarm.message}</div>
            <div
              className="flex items-center"
              onClick={() => alert("페이지 이동 예정")}
            >
              <div className="text-xs ml-l">자세히 보기</div>
              <div className="flex items-center justify-center rounded-full cursor-pointer pl-1">
                <Icon name="arrowicon_line_right" size={12} />
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
