import { useState, useRef } from "react";
import QRButton from "./QRButton";
import { useSwipeable } from "react-swipeable";

type UserMainQRButtonProps = {
  qrCount: number;
};

const UserMainQRButton: React.FC<UserMainQRButtonProps> = ({ qrCount }) => {
  /// 더미데이터
  const qrData = Array.from({ length: qrCount }, (_, index) => ({
    title: `요청 ${index + 1}`,
    partnername: `파트너 ${String.fromCharCode(65 + index)}`,
    duedate: `2025-03-${20 + index}`,
    qrimg: "none",
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex < qrData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="relative w-full py-1 overflow-hidden" {...handlers}>
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {qrData.map((data, index) => (
          <div key={index} className="w-full flex-shrink-0 px-2">
            <QRButton {...data} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-16 h-3 inline-flex justify- items-center gap-[3px] mx-auto mt-3">
          {qrData.map((_, index) => {
            let opacity = "opacity-20";
            if (index === currentIndex) opacity = "";
            else if (Math.abs(index - currentIndex) === 1)
              opacity = "opacity-60";

            return (
              <div
                key={index}
                className={`w-2.5 h-2.5 bg-zinc-300 rounded-full ${opacity}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserMainQRButton;
