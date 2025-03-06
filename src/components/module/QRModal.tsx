import React from "react";
import CommonButton from "../common/button/CommonButton";

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

      <div className="w-full flex flex-col gap-4 items-start">
        <p className="text-black text-base font-bold opacity-60 leading-normal mb-3">
          {storename}
          <br />
          유효기간 ~{duedate}
        </p>
        <div className="flex w-full gap-2">
          <CommonButton
              size="small"
              isActive={true}
              mode="fill"
              color="blue"
              detail={{label: "쿠폰 선물하기", position: "none"}}
          />
          <CommonButton
              size="small"
              isActive={true}
              mode="line"
              color="blue"
              detail={{label: "쿠폰 삭제하기", position: "none"}}
          />
        </div>
      </div>
    </div>
  );
};


export default QRModal;
