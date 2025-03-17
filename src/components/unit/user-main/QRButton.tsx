type QRButtonProps = {
  title: string;
  partnername: string;
  duedate: string;
  qrimg: string;
  onClick?: () => void;
};

const QRButton: React.FC<QRButtonProps> = ({
  title,
  partnername,
  duedate,
  qrimg,
  onClick,
}) => {
  return (
    <div
      className="flex w-full justify-between items-center px-5 py-7 rounded-xl shadow-custom-basic bg-white"
      onClick={onClick}
    >
      <div className="flex flex-col">
        {/* Title */}
        <div className="flex pb-2">
          <h1 className="text-black text-lg font-bold">{title}</h1>
        </div>

        {/* 파트너명 */}
        <div className="flex">
          <p className="text-gray-500 text-base leading-[32px]">
            {partnername}
            <br />
            {duedate}
          </p>
        </div>
      </div>

      {/* qr이미지 */}
      <div className="relative w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center">
        {qrimg ? (
          <img
            src={qrimg}
            alt="QR Code"
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-gray-500">QR 이미지 없음</div>
        )}

        <div className="absolute rounded-xl inset-0 bg-white/50 backdrop-blur-sm z-10"></div>
      </div>
    </div>
  );
};

export default QRButton;
