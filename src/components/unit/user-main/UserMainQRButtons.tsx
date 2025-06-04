import { useState, useRef } from "react";
import QRButton from "./QRButton";
import { useSwipeable } from "react-swipeable";
import BasicModal from "../../common/modal/BasicModal";
import QRModal from "../../module/QRModal";
import { QRData } from "../../../types/QRData.ts";

type Props = {
  qrData: QRData[];
};

const UserMainQRButton: React.FC<Props> = ({ qrData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState<QRData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => currentIndex < qrData.length - 1 && setCurrentIndex((prev) => prev + 1),
    onSwipedRight: () => currentIndex > 0 && setCurrentIndex((prev) => prev - 1),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleQRButtonClick = (qr: QRData) => {
    setSelectedQR(qr);
    setIsBasicModalOpen(true);
  };

  return (
    <div className="relative w-full py-1 overflow-hidden" {...handlers}>
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {qrData.map((data, index) => (
          <div key={index} className="w-full flex-shrink-0 px-2">
            <QRButton {...data} onClick={() => handleQRButtonClick(data)} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-16 h-3 inline-flex justify-center items-center gap-[3px] mt-3">
          {qrData.map((_, index) => {
            let opacity = "opacity-20";
            if (index === currentIndex) opacity = "";
            else if (Math.abs(index - currentIndex) === 1) opacity = "opacity-60";

            return (
              <div
                key={index}
                className={`w-2.5 h-2.5 bg-zinc-300 rounded-full ${opacity} transition-opacity duration-300`}
              />
            );
          })}
        </div>
      </div>

      <BasicModal
        mode="YesNo"
        isOpen={isBasicModalOpen}
        title="쿠폰을 사용하시나요?"
        onClose={() => setIsBasicModalOpen(false)}
        onConfirm={() => {
          setIsBasicModalOpen(false);
          setIsQRModalOpen(true);
        }}
      />

      {isQRModalOpen && selectedQR && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsQRModalOpen(false)}>
          <QRModal
            title={selectedQR.title}
            qrimg={selectedQR.qrimg}
            coupnum="1234-567-81"
            storename={selectedQR.partnername}
            duedate={selectedQR.duedate}
            onClose={() => setIsQRModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default UserMainQRButton;
