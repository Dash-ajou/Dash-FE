import React from "react";

type QRModalProps = {
  title: string;
  qrimg: string;
  coupnum: string;
  storename: string;
  duedate: string;
};

const QRModal: React.FC<QRModalProps> = ({ title, qrimg, coupnum, storename, duedate }) => {
  return (
    <div className="flex flex-col p-8 bg-white rounded-xl shadow-custom-basic justify-between items-center max-w-sm">
      {/* Title */}
      <div className="w-full flex flex-col mb-8 items-start">
        <h1 className="text-black text-xl font-bold leading-normal">{title}</h1>
      </div>

      {/* QR Code and Coupon Number */}
      <div className="flex flex-col justify-center items-center gap-4 flex-grow">
        <div className="w-[170px] h-[170px] bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center">
          {qrimg ? (
            <img src={qrimg} alt="QR Code" className="object-contain w-full h-full" />
          ) : (
            <div className="text-gray-500">QR 이미지 없음</div>
          )}
        </div>
        <p className="text-black text-sm font-normal tracking-widest text-center mb-8">{coupnum}</p>
      </div>

      {/* Store and Due Date */}
      <div className="w-full flex flex-col gap-4 items-start">
        <p className="text-black text-base font-bold opacity-60 leading-normal mb-3">
          {storename}
          <br />
          유효기간 ~{duedate}
        </p>
        {/* Buttons */}
        <div className="flex justify-between w-full gap-4">
          <button className="flex-1 bg-blue-500 text-white text-sm font-semibold py-2 rounded-xl flex justify-center items-center">
            쿠폰 선물하기
          </button>
          <button className="flex-1 border border-blue-500 text-blue-500 text-sm font-semibold py-2 rounded-xl flex justify-center items-center">
            쿠폰 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
