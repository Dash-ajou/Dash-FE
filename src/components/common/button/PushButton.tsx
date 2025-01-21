import React, { useState, useEffect, TouchEvent } from 'react';
import IconRegistry from './IconRegistry';

type PushButtonProps = {
  read: boolean;
  type: 'couprequest' | 'coupused' | 'couptime' | 'coupgift';
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
  const [read, setRead] = useState(initialRead); // 읽음 상태
  const [startX, setStartX] = useState<number | null>(null); // 터치 시작 위치
  const [currentX, setCurrentX] = useState(0); // 현재 슬라이드 위치
  const [isSlid, setIsSlid] = useState(false); // 슬라이드 여부

  const iconAndAlarm = (() => {
    switch (type) {
      case 'couprequest':
        return { icon: IconRegistry.checkicon_fill, message: '쿠폰 발행 요청이 도착했어요' };
      case 'coupused':
        return { icon: IconRegistry.checkicon_fill, message: '쿠폰 사용이 완료되었어요' };
      case 'couptime':
        return { icon: IconRegistry.pendingicon_fill, message: '쿠폰 만료가 임박했어요' };
      case 'coupgift':
        return { icon: IconRegistry.gifticon_line, message: '쿠폰을 선물받았어요' };
      default:
        return { icon: null, message: '' };
    }
  })();

  // 터치 시작 
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (read) return;
    setStartX(e.touches[0].clientX);
  };

  // 터치 이동 
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (read || startX === null) return;
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX < 0) {
      setCurrentX(deltaX);
    }
  };

  // 터치 종료 
  const handleTouchEnd = () => {
    if (read) return;
    if (currentX < -50) {
      setIsSlid(true);
    } else {
      setCurrentX(0);
    }
    setStartX(null);
  };

  // 읽음 버튼 클릭
  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setRead(true);
    onRead();
    setIsSlid(false);
    setCurrentX(0);
  };

  // 슬라이드 상태 초기화
  const resetSlide = () => {
    setIsSlid(false);
    setCurrentX(0);
  };

  // 화면 클릭 이벤트 감지
  useEffect(() => {
    const handleClickOutside = () => {
      if (isSlid) resetSlide(); // 슬라이드 상태일 때만 초기화
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSlid]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onClick={(e) => e.stopPropagation()} // 자체 클릭 이벤트 전파 방지
    >

      <div
        className={`flex items-center justify-between w-full h-16 py-3 px-5 rounded-xl transition-transform duration-300 ${
          read ? 'bg-serviceColor05 text-gray-900' : 'bg-main05 text-black-900'
        }`}
        style={{
          transform: `translateX(${isSlid ? -80 : currentX}px)`,
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
          <div className="flex justify-between mt-1">
            <div className="text-xs">{iconAndAlarm.message}</div>
            <div className="text-xs">자세히 보기<span>{'>'}</span></div>
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
